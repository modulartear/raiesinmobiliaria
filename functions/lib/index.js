"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyWhatsappAndEmailOnVerificationFilesReady = exports.notifyWhatsappOnRentalRequestCreated = exports.notifyWhatsappOnConsultationCreated = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const logger = __importStar(require("firebase-functions/logger"));
const firestore_2 = require("firebase-functions/v2/firestore");
(0, app_1.initializeApp)();
const db = (0, firestore_1.getFirestore)();
const ADMIN_EMAIL_TO = "diseartevt@gmail.com";
function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
}
function displayOrDash(value) {
    const text = String(value ?? "").trim();
    return text || "—";
}
async function getAdminWhatsappTo() {
    const snap = await db.doc("settings/general").get();
    const data = snap.exists ? snap.data() : {};
    const raw = String(data?.whatsapp || data?.phone || process.env.ADMIN_WHATSAPP_TO || "").trim();
    const to = digitsOnly(raw);
    if (!to) {
        throw new Error("Falta configurar ADMIN_WHATSAPP_TO o settings/general.whatsapp|phone");
    }
    return to;
}
async function sendWhatsappText(body) {
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
async function sendEmail(subject, text) {
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
function formatConsultationMessage(data, id) {
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
function formatRentalRequestMessage(data, id) {
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
function formatVerificationMessage(data, id) {
    const propertyTitle = String(data?.propertyTitle || "Propiedad").trim();
    const optionTitle = String(data?.optionTitle || data?.optionKey || "Verificación").trim();
    const status = String(data?.status || "Pendiente").trim();
    const missing = Array.isArray(data?.missing) ? data.missing.map((v) => String(v)).filter(Boolean) : [];
    const files = Array.isArray(data?.files) ? data.files : [];
    const urls = files.map((f) => String(f?.url || "")).filter(Boolean);
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
exports.notifyWhatsappOnConsultationCreated = (0, firestore_2.onDocumentCreated)({ document: "consultations/{id}" }, async (event) => {
    const snap = event.data;
    if (!snap)
        return;
    const id = snap.id;
    const data = snap.data();
    const alreadySent = Boolean(data?.notif?.whatsappSentAt);
    if (alreadySent)
        return;
    const message = formatConsultationMessage(data, id);
    try {
        await sendWhatsappText(message);
        await snap.ref.set({ notif: { whatsappSentAt: firestore_1.FieldValue.serverTimestamp() } }, { merge: true });
    }
    catch (e) {
        logger.error("Error enviando WhatsApp (consultation)", { id, error: e?.message || String(e) });
        await snap.ref.set({ notif: { whatsappError: e?.message || String(e), whatsappErrorAt: firestore_1.FieldValue.serverTimestamp() } }, { merge: true });
    }
});
exports.notifyWhatsappOnRentalRequestCreated = (0, firestore_2.onDocumentCreated)({ document: "rental_requests/{id}" }, async (event) => {
    const snap = event.data;
    if (!snap)
        return;
    const id = snap.id;
    const data = snap.data();
    const alreadySent = Boolean(data?.notif?.whatsappSentAt);
    if (alreadySent)
        return;
    const message = formatRentalRequestMessage(data, id);
    try {
        await sendWhatsappText(message);
        await snap.ref.set({ notif: { whatsappSentAt: firestore_1.FieldValue.serverTimestamp() } }, { merge: true });
    }
    catch (e) {
        logger.error("Error enviando WhatsApp (rental_request)", { id, error: e?.message || String(e) });
        await snap.ref.set({ notif: { whatsappError: e?.message || String(e), whatsappErrorAt: firestore_1.FieldValue.serverTimestamp() } }, { merge: true });
    }
});
exports.notifyWhatsappAndEmailOnVerificationFilesReady = (0, firestore_2.onDocumentUpdated)({ document: "verification_requests/{id}" }, async (event) => {
    const before = event.data?.before;
    const after = event.data?.after;
    if (!before || !after)
        return;
    const id = after.id;
    const beforeData = before.data();
    const afterData = after.data();
    const alreadySent = Boolean(afterData?.notif?.emailSentAt) || Boolean(afterData?.notif?.whatsappSentAt);
    if (alreadySent)
        return;
    const beforeFiles = Array.isArray(beforeData?.files) ? beforeData.files : [];
    const afterFiles = Array.isArray(afterData?.files) ? afterData.files : [];
    const becameReady = beforeFiles.length === 0 && afterFiles.length > 0;
    if (!becameReady)
        return;
    const formatted = formatVerificationMessage(afterData, id);
    const errors = [];
    try {
        await sendWhatsappText(formatted.whatsapp);
    }
    catch (e) {
        errors.push(`WhatsApp: ${e?.message || String(e)}`);
        logger.error("Error enviando WhatsApp (verification)", { id, error: e?.message || String(e) });
    }
    try {
        await sendEmail(formatted.emailSubject, formatted.emailText);
    }
    catch (e) {
        errors.push(`Email: ${e?.message || String(e)}`);
        logger.error("Error enviando Email (verification)", { id, error: e?.message || String(e) });
    }
    if (errors.length === 0) {
        await after.ref.set({ notif: { whatsappSentAt: firestore_1.FieldValue.serverTimestamp(), emailSentAt: firestore_1.FieldValue.serverTimestamp() } }, { merge: true });
        return;
    }
    await after.ref.set({
        notif: {
            error: errors.join(" | "),
            errorAt: firestore_1.FieldValue.serverTimestamp()
        }
    }, { merge: true });
});
