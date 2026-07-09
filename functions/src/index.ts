import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";

initializeApp();

const db = getFirestore();

const ADMIN_EMAIL_TO = "diseartevt@gmail.com";

function digitsOnly(value: string): string {
  return String(value || "").replace(/\D/g, "");
}

function displayOrDash(value: unknown): string {
  const text = String(value ?? "").trim();
  return text || "—";
}

async function getAdminWhatsappTo(): Promise<string> {
  const snap = await db.doc("settings/general").get();
  const data = snap.exists ? (snap.data() as any) : {};
  const raw = String(data?.whatsapp || data?.phone || process.env.ADMIN_WHATSAPP_TO || "").trim();
  const to = digitsOnly(raw);
  if (!to) {
    throw new Error("Falta configurar ADMIN_WHATSAPP_TO o settings/general.whatsapp|phone");
  }
  return to;
}

async function sendWhatsappText(body: string): Promise<void> {
  const token = String(process.env.WHATSAPP_TOKEN || "").trim();
  const phoneNumberId = String(process.env.WHATSAPP_PHONE_NUMBER_ID || "").trim();
  if (!token || !phoneNumberId) {
    throw new Error("Faltan WHATSAPP_TOKEN y/o WHATSAPP_PHONE_NUMBER_ID");
  }

  const to = await getAdminWhatsappTo();
  const url = `https://graph.facebook.com/v20.0/${encodeURIComponent(phoneNumberId)}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body }
    })
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`WhatsApp API ${res.status}: ${text}`);
  }
}

async function sendEmail(subject: string, text: string): Promise<void> {
  const apiKey = String(process.env.RESEND_API_KEY || "").trim();
  const from = String(process.env.EMAIL_FROM || "").trim();
  if (!apiKey) {
    throw new Error("Falta RESEND_API_KEY");
  }
  if (!from) {
    throw new Error("Falta EMAIL_FROM (ej: \"Raies <no-reply@tudominio.com>\")");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [ADMIN_EMAIL_TO],
      subject,
      text
    })
  });

  const payload = await res.text();
  if (!res.ok) {
    throw new Error(`Email API ${res.status}: ${payload}`);
  }
}

function formatConsultationMessage(data: any, id: string): string {
  const msg = String(data?.message || data?.msg || "").trim();
  const propertyTitle = String(data?.propertyTitle || "Consulta general").trim();
  const monthlyIncome = Number(data?.monthlyIncome || 0) || 0;
  const income = monthlyIncome ? `$${monthlyIncome.toLocaleString("es-AR")}` : "—";

  const lines = [
    "Nueva consulta (SIN documentación)",
    `Propiedad: ${displayOrDash(propertyTitle)}`,
    `Nombre: ${displayOrDash(data?.name)}`,
    `Tel: ${displayOrDash(data?.phone)}`,
    `Email: ${displayOrDash(data?.email)}`,
    `Ingreso: ${income}`,
    `Mensaje: ${msg || "—"}`,
    `ID: ${id}`
  ];

  return lines.join("\n");
}

function formatRentalRequestMessage(data: any, id: string): string {
  const propertyTitle = String(data?.propertyTitle || "Propiedad").trim();
  const monthlyIncome = Number(data?.monthlyIncome || 0) || 0;
  const income = monthlyIncome ? `$${monthlyIncome.toLocaleString("es-AR")}` : "—";

  const lines = [
    "Nueva consulta (SIN documentación) · Solicitud de alquiler",
    `Propiedad: ${displayOrDash(propertyTitle)}`,
    `Nombre: ${displayOrDash(data?.name)}`,
    `Tel: ${displayOrDash(data?.phone)}`,
    `Email: ${displayOrDash(data?.email)}`,
    `Ingreso: ${income}`,
    `ID: ${id}`
  ];

  return lines.join("\n");
}

function formatVerificationMessage(data: any, id: string): { whatsapp: string; emailSubject: string; emailText: string } {
  const propertyTitle = String(data?.propertyTitle || "Propiedad").trim();
  const optionTitle = String(data?.optionTitle || data?.optionKey || "Verificación").trim();
  const status = String(data?.status || "Pendiente").trim();
  const missing = Array.isArray(data?.missing) ? data.missing.map((v: any) => String(v)).filter(Boolean) : [];
  const files = Array.isArray(data?.files) ? data.files : [];
  const urls = files.map((f: any) => String(f?.url || "")).filter(Boolean);

  const baseLines = [
    "Nueva consulta CON documentación · Verificación online",
    `Propiedad: ${displayOrDash(propertyTitle)}`,
    `Opción: ${displayOrDash(optionTitle)}`,
    `Estado: ${displayOrDash(status)}`,
    `Nombre: ${displayOrDash(data?.name)}`,
    `Tel: ${displayOrDash(data?.phone)}`,
    `Email: ${displayOrDash(data?.email)}`,
    `Faltantes: ${missing.length ? missing.join(", ") : "—"}`,
    `Archivos: ${urls.length ? urls.join(" | ") : "—"}`,
    `ID: ${id}`
  ];

  const whatsapp = baseLines.join("\n");
  const emailSubject = `RAIES · Consulta con documentación · ${displayOrDash(propertyTitle)}`;
  const emailText = baseLines.join("\n");

  return { whatsapp, emailSubject, emailText };
}

export const notifyWhatsappOnConsultationCreated = onDocumentCreated(
  { document: "consultations/{id}" },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const id = snap.id;
    const data = snap.data() as any;
    const alreadySent = Boolean(data?.notif?.whatsappSentAt);
    if (alreadySent) return;

    const message = formatConsultationMessage(data, id);
    try {
      await sendWhatsappText(message);
      await snap.ref.set({ notif: { whatsappSentAt: FieldValue.serverTimestamp() } }, { merge: true });
    } catch (e: any) {
      logger.error("Error enviando WhatsApp (consultation)", { id, error: e?.message || String(e) });
      await snap.ref.set(
        { notif: { whatsappError: e?.message || String(e), whatsappErrorAt: FieldValue.serverTimestamp() } },
        { merge: true }
      );
    }
  }
);

export const notifyWhatsappOnRentalRequestCreated = onDocumentCreated(
  { document: "rental_requests/{id}" },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const id = snap.id;
    const data = snap.data() as any;
    const alreadySent = Boolean(data?.notif?.whatsappSentAt);
    if (alreadySent) return;

    const message = formatRentalRequestMessage(data, id);
    try {
      await sendWhatsappText(message);
      await snap.ref.set({ notif: { whatsappSentAt: FieldValue.serverTimestamp() } }, { merge: true });
    } catch (e: any) {
      logger.error("Error enviando WhatsApp (rental_request)", { id, error: e?.message || String(e) });
      await snap.ref.set(
        { notif: { whatsappError: e?.message || String(e), whatsappErrorAt: FieldValue.serverTimestamp() } },
        { merge: true }
      );
    }
  }
);

export const notifyWhatsappAndEmailOnVerificationFilesReady = onDocumentUpdated(
  { document: "verification_requests/{id}" },
  async (event) => {
    const before = event.data?.before;
    const after = event.data?.after;
    if (!before || !after) return;

    const id = after.id;
    const beforeData = before.data() as any;
    const afterData = after.data() as any;

    const alreadySent = Boolean(afterData?.notif?.emailSentAt) || Boolean(afterData?.notif?.whatsappSentAt);
    if (alreadySent) return;

    const beforeFiles = Array.isArray(beforeData?.files) ? beforeData.files : [];
    const afterFiles = Array.isArray(afterData?.files) ? afterData.files : [];
    const becameReady = beforeFiles.length === 0 && afterFiles.length > 0;
    if (!becameReady) return;

    const formatted = formatVerificationMessage(afterData, id);
    const errors: string[] = [];

    try {
      await sendWhatsappText(formatted.whatsapp);
    } catch (e: any) {
      errors.push(`WhatsApp: ${e?.message || String(e)}`);
      logger.error("Error enviando WhatsApp (verification)", { id, error: e?.message || String(e) });
    }

    try {
      await sendEmail(formatted.emailSubject, formatted.emailText);
    } catch (e: any) {
      errors.push(`Email: ${e?.message || String(e)}`);
      logger.error("Error enviando Email (verification)", { id, error: e?.message || String(e) });
    }

    if (errors.length === 0) {
      await after.ref.set(
        { notif: { whatsappSentAt: FieldValue.serverTimestamp(), emailSentAt: FieldValue.serverTimestamp() } },
        { merge: true }
      );
      return;
    }

    await after.ref.set(
      {
        notif: {
          error: errors.join(" | "),
          errorAt: FieldValue.serverTimestamp()
        }
      },
      { merge: true }
    );
  }
);
