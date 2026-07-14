import { css } from "../lib/css";
import MsIcon from "./MsIcon";
import type { VerificationConfig } from "../data/models";
import { useMemo, useRef, useState } from "react";
import { logoRaiesUrl } from "../lib/assets";

type ResultState =
  | { status: ""; message: ""; missing: string[] }
  | { status: "PreAprobado" | "Pendiente"; message: string; missing: string[] };

export default function VerificationModal({
  open,
  config,
  onClose,
  onSubmit
}: {
  open: boolean;
  config: VerificationConfig;
  onClose: () => void;
  onSubmit: (payload: {
    optionKey: "op1" | "op2";
    name: string;
    email: string;
    phone: string;
    guarantorSeniorityYears: number;
    deedInLocation: boolean;
    files: {
      tenantPayslip: File | null;
      guarantorPayslips: File[];
      deed: File | null;
    };
    setResult: (r: ResultState) => void;
  }) => Promise<void>;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [optionKey, setOptionKey] = useState<"op1" | "op2">("op1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guarantorYears, setGuarantorYears] = useState("3");
  const [deedInLocation, setDeedInLocation] = useState(false);
  const [tenantPayslip, setTenantPayslip] = useState<File | null>(null);
  const [guarantorPayslips, setGuarantorPayslips] = useState<File[]>([]);
  const [deed, setDeed] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>({ status: "", message: "", missing: [] });
  const [overlay, setOverlay] = useState<"" | "loading" | "success">("");

  const tenantInputRef = useRef<HTMLInputElement | null>(null);
  const guarantorInputRef = useRef<HTMLInputElement | null>(null);
  const deedInputRef = useRef<HTMLInputElement | null>(null);

  const selectedOption = useMemo(() => {
    return (
      config.options.find((o) => o.key === optionKey) ||
      config.options[0] || {
        key: "op1",
        title: "Opción 1",
        tenantPayslipRequired: true,
        guarantorPayslipsMin: 4,
        guarantorSeniorityYearsMin: 3,
        deedRequired: false,
        deedLocationLabel: "Venado Tuerto"
      }
    );
  }, [config.options, optionKey]);

  const deedLabel = selectedOption.deedLocationLabel || "Venado Tuerto";

  function optionDetailLines(opt: (typeof selectedOption) | any): string[] {
    const lines: string[] = [];
    if (opt.tenantPayslipRequired) {
      lines.push("Recibo de sueldo del inquilino");
    }
    if (opt.guarantorPayslipsMin) {
      lines.push(`Garantías: mínimo ${opt.guarantorPayslipsMin} recibos de sueldo de garantes`);
    }
    if (opt.guarantorSeniorityYearsMin) {
      lines.push(`Antigüedad garantes: más de ${opt.guarantorSeniorityYearsMin} años`);
    }
    if (opt.deedRequired) {
      lines.push(`Escritura de inmueble en ${opt.deedLocationLabel || "Venado Tuerto"}`);
    }
    return lines;
  }

  function resetAll() {
    setStep(1);
    setOptionKey("op1");
    setName("");
    setEmail("");
    setPhone("");
    setGuarantorYears(String(selectedOption.guarantorSeniorityYearsMin || 3));
    setDeedInLocation(false);
    setTenantPayslip(null);
    setGuarantorPayslips([]);
    setDeed(null);
    setLoading(false);
    setResult({ status: "", message: "", missing: [] });
  }

  function close() {
    resetAll();
    onClose();
  }

  function canGoStep2() {
    return name.trim() && email.trim();
  }

  function pickTenantPayslip(files: FileList | null) {
    const f = files && files[0] ? files[0] : null;
    setTenantPayslip(f);
  }

  function pickGuarantorPayslips(files: FileList | null) {
    const incoming = files ? Array.from(files) : [];
    if (!incoming.length) return;
    setGuarantorPayslips((prev) => {
      return [...prev, ...incoming].slice(0, 10);
    });
  }

  function pickDeed(files: FileList | null) {
    const f = files && files[0] ? files[0] : null;
    setDeed(f);
  }

  async function submit() {
    setResult({ status: "", message: "", missing: [] });
    if (!name.trim() || !email.trim()) {
      setResult({
        status: "Pendiente",
        message: "Completá nombre y email para continuar.",
        missing: []
      });
      return;
    }
    const years = Number(String(guarantorYears).replace(/[^\d]/g, "")) || 0;
    setLoading(true);
    setOverlay("loading");
    let outcomeStatus = "" as string;
    try {
      await onSubmit({
        optionKey,
        name,
        email,
        phone,
        guarantorSeniorityYears: years,
        deedInLocation,
        files: { tenantPayslip, guarantorPayslips, deed },
        setResult: (r) => {
          outcomeStatus = r.status;
          setResult(r);
        }
      });
      if (outcomeStatus === "PreAprobado") {
        setOverlay("success");
        window.setTimeout(() => {
          close();
          setOverlay("");
        }, 1200);
        return;
      }
    } finally {
      setLoading(false);
      if (outcomeStatus !== "PreAprobado") setOverlay("");
    }
  }

  if (!open) return null;

  return (
    <div
      className="modal-shell"
      style={css(
        "position:fixed;inset:0;z-index:410;background:rgba(8,20,16,.62);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px"
      )}
    >
      <style>{`
        @keyframes raiesLogoPulse {
          0% { transform: translateZ(0) scale(1); }
          50% { transform: translateZ(0) scale(1.06); }
          100% { transform: translateZ(0) scale(1); }
        }
        @keyframes raiesSpinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes raiesFadeUp {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="modal-card modal-card--verification"
        style={css(
          "position:relative;width:min(720px,100%);background:#fff;border-radius:22px;padding:28px 28px 24px;box-shadow:0 34px 80px -24px rgba(0,0,0,.45);border:1px solid rgba(18,58,47,.08)"
        )}
      >
        {overlay && (
          <div
            style={css(
              "position:absolute;inset:0;border-radius:22px;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:30"
            )}
          >
            <div
              style={css(
                "width:min(420px,92%);background:#fff;border-radius:22px;border:1px solid rgba(18,58,47,.10);box-shadow:0 34px 90px -30px rgba(0,0,0,.35);padding:26px 22px;display:flex;flex-direction:column;align-items:center;text-align:center;animation:raiesFadeUp .22s ease-out"
              )}
            >
              <div style={css("position:relative;width:92px;height:92px;margin-bottom:14px")}>
                <div
                  style={css(
                    "position:absolute;inset:-8px;border-radius:999px;border:2px solid rgba(201,163,77,.35);border-top-color:#C9A34D;animation:raiesSpinner 1s linear infinite"
                  )}
                />
                <div
                  style={css(
                    "position:absolute;inset:0;border-radius:999px;background:linear-gradient(180deg, rgba(201,163,77,.18), rgba(18,58,47,.06));display:flex;align-items:center;justify-content:center"
                  )}
                >
                  <img
                    src={logoRaiesUrl}
                    alt="RAIES"
                    style={{
                      width: 66,
                      height: 66,
                      borderRadius: 999,
                      objectFit: "cover",
                      boxShadow: "0 14px 26px -16px rgba(0,0,0,.55)",
                      animation: overlay === "loading" ? "raiesLogoPulse 1.05s ease-in-out infinite" : "none"
                    }}
                  />
                </div>
              </div>

              {overlay === "loading" ? (
                <>
                  <div style={css("font:900 16px/1 'Plus Jakarta Sans';color:#123A2F")}>
                    Aguarde
                  </div>
                  <div style={css("font-size:13px;color:#6b7570;line-height:1.45;margin-top:8px")}>
                    Estamos enviando la documentación. No cierres esta ventana.
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={css(
                      "font-family:'Schibsted Grotesk';font-weight:900;font-size:36px;letter-spacing:-.02em;color:#1c7a4d"
                    )}
                  >
                    PreAprobado
                  </div>
                  <div style={css("font-size:13px;color:#6b7570;line-height:1.45;margin-top:8px")}>
                    Listo. Cerrando…
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div
          className="modal-head"
          style={css(
            "display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px"
          )}
        >
          <div>
            <div
              style={css(
                "font-family:'Schibsted Grotesk';font-weight:800;font-size:24px;color:#123A2F"
              )}
            >
              Verificación online
            </div>
            <div style={css("font-size:13.5px;color:#6b7570;margin-top:6px")}>
              Completá tus datos y cargá la documentación. Si coincide con los criterios, verás el estado PreAprobado.
            </div>
          </div>
          <button
            onClick={close}
            disabled={Boolean(overlay)}
            style={css(
              "width:36px;height:36px;border-radius:10px;border:none;background:#F4F5F5;color:#123A2F;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:" +
                (overlay ? ".45" : "1")
            )}
          >
            <MsIcon name="close" style={{ fontSize: 20 }} />
          </button>
        </div>

        <div className="verification-steps" style={css("display:flex;gap:10px;margin-bottom:18px")}>
          {[1, 2].map((n) => (
            <div
              key={n}
              style={css(
                "flex:1;display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;border:1px solid rgba(18,58,47,.08);background:" +
                  (step === n ? "rgba(201,163,77,.14)" : "#F7F8F8")
              )}
            >
              <span
                style={css(
                  "width:28px;height:28px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:800 12px/1 'Plus Jakarta Sans';background:" +
                    (step === n ? "#C9A34D" : "rgba(18,58,47,.15)") +
                    ";color:" +
                    (step === n ? "#1a1408" : "#123A2F")
                )}
              >
                {n}
              </span>
              <span style={css("font:700 13.5px/1 'Plus Jakarta Sans';color:#123A2F")}>
                {n === 1 ? "Datos" : "Documentación"}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px")}>
              {config.options.map((opt) => {
                const active = opt.key === optionKey;
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setOptionKey(opt.key);
                      setGuarantorYears(String(opt.guarantorSeniorityYearsMin || 3));
                      setDeedInLocation(false);
                      setResult({ status: "", message: "", missing: [] });
                    }}
                    style={css(
                      "padding:10px 16px;border-radius:12px;border:1.5px solid " +
                        (active ? "#205843" : "#E2E4E6") +
                        ";background:" +
                        (active ? "rgba(32,88,67,.08)" : "#fff") +
                        ";color:" +
                        (active ? "#205843" : "#5a6460") +
                        ";font:700 13px/1 'Plus Jakarta Sans';cursor:pointer"
                    )}
                  >
                    {opt.title}
                  </button>
                );
              })}
            </div>

            <div
              style={css(
                "background:#fff;border:1px solid rgba(18,58,47,.08);border-radius:16px;padding:16px 16px;margin-bottom:16px"
              )}
            >
              <div
                style={css(
                  "display:flex;align-items:center;gap:10px;margin-bottom:12px;color:#123A2F"
                )}
              >
                <span
                  style={css(
                    "width:34px;height:34px;border-radius:11px;background:rgba(201,163,77,.16);display:flex;align-items:center;justify-content:center;color:#b08a2f"
                  )}
                >
                  <MsIcon name="list_alt" style={{ fontSize: 19 }} />
                </span>
                <div>
                  <div
                    style={css(
                      "font:900 13.5px/1 'Plus Jakarta Sans';letter-spacing:.02em"
                    )}
                  >
                    Detalle de requisitos
                  </div>
                  <div style={css("font-size:12.5px;color:#8a928e;margin-top:4px")}>
                    Elegí una opción y verificá qué documentación te pedimos.
                  </div>
                </div>
              </div>

              <div className="verification-detail-grid" style={css("display:grid;grid-template-columns:1fr 1fr;gap:12px")}>
                {config.options.slice(0, 2).map((opt) => {
                  const active = opt.key === optionKey;
                  const lines = optionDetailLines(opt);
                  return (
                    <div
                      key={opt.key}
                      style={css(
                        "border-radius:14px;padding:14px 14px;border:1.5px solid " +
                          (active ? "rgba(32,88,67,.38)" : "rgba(18,58,47,.10)") +
                          ";background:" +
                          (active ? "rgba(32,88,67,.06)" : "#F7F8F8")
                      )}
                    >
                      <div
                        style={css(
                          "display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px"
                        )}
                      >
                        <div
                          style={css(
                            "font:900 13.5px/1 'Plus Jakarta Sans';color:#123A2F"
                          )}
                        >
                          {opt.title}
                        </div>
                        {active && (
                          <span
                            style={css(
                              "display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:10px;background:rgba(32,120,77,.12);color:#1c7a4d;font:800 11px/1 'Plus Jakarta Sans'"
                            )}
                          >
                            <span
                              style={css(
                                "width:7px;height:7px;border-radius:50%;background:#1c7a4d"
                              )}
                            />
                            Seleccionada
                          </span>
                        )}
                      </div>

                      <div style={css("display:flex;flex-direction:column;gap:8px")}>
                        {lines.map((txt) => (
                          <div
                            key={txt}
                            style={css(
                              "display:flex;align-items:flex-start;gap:9px;font-size:13px;line-height:1.45;color:#3a443f"
                            )}
                          >
                            <MsIcon
                              name="task_alt"
                              style={{ fontSize: 18, color: "#C9A34D", marginTop: 1 }}
                            />
                            <span>{txt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="modal-form-grid" style={css("display:grid;grid-template-columns:1fr 1fr;gap:14px")}>
              <div>
                <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                  Nombre
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  style={css(
                    "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                  )}
                />
              </div>
              <div>
                <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@email.com"
                  style={css(
                    "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                  )}
                />
              </div>
              <div>
                <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                  Teléfono
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+54..."
                  style={css(
                    "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                  )}
                />
              </div>
              <div>
                <label style={css("display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px")}>
                  Antigüedad garantes (años)
                </label>
                <input
                  value={guarantorYears}
                  onChange={(e) => setGuarantorYears(e.target.value)}
                  placeholder="3"
                  style={css(
                    "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
                  )}
                />
              </div>
            </div>

            {selectedOption.deedRequired && (
              <div style={css("margin-top:14px;background:#F7F8F8;border:1px solid rgba(18,58,47,.08);border-radius:14px;padding:14px 16px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px")}>
                  <div>
                    <div style={css("font:700 13.5px/1.2 'Plus Jakarta Sans';color:#123A2F")}>
                      Escritura en {deedLabel}
                    </div>
                    <div style={css("font-size:12.5px;color:#8a928e;margin-top:4px")}>
                      Confirmá que contás con una escritura de inmueble en {deedLabel}.
                    </div>
                  </div>
                  <button
                    onClick={() => setDeedInLocation((v) => !v)}
                    style={css(
                      "width:44px;height:26px;border-radius:999px;border:none;cursor:pointer;position:relative;background:" +
                        (deedInLocation ? "#205843" : "#cdd2d3")
                    )}
                  >
                    <span
                      style={css(
                        "position:absolute;top:3px;left:" +
                          (deedInLocation ? "21px" : "3px") +
                          ";width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3)"
                      )}
                    />
                  </button>
                </div>
              </div>
            )}

            <div style={css("display:flex;gap:10px;justify-content:flex-end;margin-top:20px")}>
              <button
                onClick={close}
                style={css(
                  "padding:12px 16px;border-radius:12px;border:1.5px solid #E2E4E6;background:#fff;color:#5a6460;font:700 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
                )}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!canGoStep2()) {
                    setResult({
                      status: "Pendiente",
                      message: "Completá nombre y email para continuar.",
                      missing: []
                    });
                    return;
                  }
                  setStep(2);
                }}
                style={css(
                  "padding:12px 16px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:800 13.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55)"
                )}
              >
                Continuar <MsIcon name="arrow_forward" style={{ fontSize: 18 }} />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div
              style={css(
                "background:#F7F8F8;border:1px solid rgba(18,58,47,.08);border-radius:16px;padding:18px 18px;margin-bottom:16px"
              )}
            >
              <div style={css("display:flex;align-items:flex-start;justify-content:space-between;gap:14px")}>
                <div>
                  <div style={css("font:800 14px/1 'Plus Jakarta Sans';color:#123A2F")}>
                    {selectedOption.title}
                  </div>
                  <div style={css("font-size:12.5px;color:#6b7570;margin-top:6px;line-height:1.45")}>
                    {selectedOption.tenantPayslipRequired ? "Recibo de sueldo del inquilino" : ""}{" "}
                    {selectedOption.guarantorPayslipsMin
                      ? `+ ${selectedOption.guarantorPayslipsMin} recibos de sueldo de garantes`
                      : ""}
                    {selectedOption.guarantorSeniorityYearsMin
                      ? ` (≥ ${selectedOption.guarantorSeniorityYearsMin} años)`
                      : ""}
                    {selectedOption.deedRequired ? ` + escritura en ${deedLabel}` : ""}
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  style={css(
                    "padding:10px 12px;border-radius:12px;border:1.5px solid rgba(18,58,47,.12);background:#fff;color:#205843;font:800 12.5px/1 'Plus Jakarta Sans';cursor:pointer"
                  )}
                >
                  <MsIcon name="edit" style={{ fontSize: 18 }} /> Editar
                </button>
              </div>
            </div>

            <div className="verification-upload-grid" style={css("display:grid;grid-template-columns:1fr 1fr;gap:14px")}>
              <div style={css("background:#fff;border:1px solid rgba(18,58,47,.08);border-radius:16px;padding:18px 18px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px")}>
                  <div>
                    <div style={css("font:800 13.5px/1 'Plus Jakarta Sans';color:#123A2F")}>
                      Recibo de sueldo del inquilino
                    </div>
                    <div style={css("font-size:12px;color:#8a928e;margin-top:5px")}>
                      Subí 1 archivo (PDF/JPG/PNG).
                    </div>
                  </div>
                  <button
                    onClick={() => tenantInputRef.current?.click()}
                    style={css(
                      "padding:10px 14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:800 12.5px/1 'Plus Jakarta Sans';cursor:pointer"
                    )}
                  >
                    <MsIcon name="upload_file" style={{ fontSize: 18 }} /> Subir
                  </button>
                  <input
                    ref={tenantInputRef}
                    type="file"
                    accept=".pdf,image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      pickTenantPayslip(e.currentTarget.files);
                      e.currentTarget.value = "";
                    }}
                  />
                </div>
                <div style={css("margin-top:12px;font-size:12.5px;color:#5a6460")}>
                  {tenantPayslip ? tenantPayslip.name : "Sin archivo"}
                </div>
              </div>

              <div style={css("background:#fff;border:1px solid rgba(18,58,47,.08);border-radius:16px;padding:18px 18px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px")}>
                  <div>
                    <div style={css("font:800 13.5px/1 'Plus Jakarta Sans';color:#123A2F")}>
                      Recibos de sueldo de garantes
                    </div>
                    <div style={css("font-size:12px;color:#8a928e;margin-top:5px")}>
                      Subí al menos {selectedOption.guarantorPayslipsMin} archivos.
                    </div>
                  </div>
                  <button
                    onClick={() => guarantorInputRef.current?.click()}
                    style={css(
                      "padding:10px 14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:800 12.5px/1 'Plus Jakarta Sans';cursor:pointer"
                    )}
                  >
                    <MsIcon name="upload_file" style={{ fontSize: 18 }} /> Subir
                  </button>
                  <input
                    ref={guarantorInputRef}
                    type="file"
                    accept=".pdf,image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                      pickGuarantorPayslips(e.currentTarget.files);
                      e.currentTarget.value = "";
                    }}
                  />
                </div>
                <div style={css("margin-top:12px")}>
                  {guarantorPayslips.length ? (
                    <>
                      <div style={css("font-size:12px;color:#8a928e;margin-bottom:8px")}>
                        Seleccionados: {guarantorPayslips.length}
                        {selectedOption.guarantorPayslipsMin ? ` / ${selectedOption.guarantorPayslipsMin}` : ""}
                      </div>
                      <div style={css("display:flex;flex-direction:column;gap:8px")}>
                        {guarantorPayslips.map((f, idx) => (
                          <div
                            key={`${f.name}__${f.size}__${f.lastModified}__${idx}`}
                            style={css(
                              "display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:14px;background:#F7F8F8;border:1px solid rgba(18,58,47,.08)"
                            )}
                          >
                            <MsIcon name="description" style={{ fontSize: 18, color: "#205843", marginTop: 1 }} />
                            <div style={css("font-size:12.5px;color:#3a443f;line-height:1.35;word-break:break-word")}>
                              {f.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={css("font-size:12.5px;color:#5a6460;line-height:1.45")}>Sin archivos</div>
                  )}
                </div>
              </div>
            </div>

            {selectedOption.deedRequired && (
              <div style={css("margin-top:14px;background:#fff;border:1px solid rgba(18,58,47,.08);border-radius:16px;padding:18px 18px")}>
                <div style={css("display:flex;align-items:center;justify-content:space-between;gap:12px")}>
                  <div>
                    <div style={css("font:800 13.5px/1 'Plus Jakarta Sans';color:#123A2F")}>
                      Escritura ({deedLabel})
                    </div>
                    <div style={css("font-size:12px;color:#8a928e;margin-top:5px")}>
                      Subí 1 archivo (PDF/JPG/PNG).
                    </div>
                  </div>
                  <button
                    onClick={() => deedInputRef.current?.click()}
                    style={css(
                      "padding:10px 14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:800 12.5px/1 'Plus Jakarta Sans';cursor:pointer"
                    )}
                  >
                    <MsIcon name="upload_file" style={{ fontSize: 18 }} /> Subir
                  </button>
                  <input
                    ref={deedInputRef}
                    type="file"
                    accept=".pdf,image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      pickDeed(e.currentTarget.files);
                      e.currentTarget.value = "";
                    }}
                  />
                </div>
                <div style={css("margin-top:12px;font-size:12.5px;color:#5a6460")}>
                  {deed ? deed.name : "Sin archivo"}
                </div>
              </div>
            )}

            {result.status && (
              <div
                style={css(
                  "margin-top:14px;border-radius:16px;padding:16px 16px;border:1px solid " +
                    (result.status === "PreAprobado" ? "rgba(32,120,77,.18)" : "rgba(201,163,77,.35)") +
                    ";background:" +
                    (result.status === "PreAprobado" ? "rgba(32,120,77,.10)" : "rgba(201,163,77,.12)")
                )}
              >
                <div style={css("display:flex;align-items:center;gap:10px;margin-bottom:6px")}>
                  <span style={css("width:10px;height:10px;border-radius:50%;background:" + (result.status === "PreAprobado" ? "#1c7a4d" : "#C9A34D"))} />
                  <span style={css("font:900 13.5px/1 'Plus Jakarta Sans';color:#123A2F")}>
                    {result.status}
                  </span>
                </div>
                <div style={css("font-size:13px;line-height:1.45;color:#3a443f")}>
                  {result.message}
                </div>
                {result.missing.length > 0 && (
                  <div style={css("margin-top:10px;font-size:12.5px;color:#5a6460;line-height:1.5")}>
                    Faltan:
                    {" " + result.missing.join(" · ")}
                  </div>
                )}
              </div>
            )}

            <div style={css("display:flex;gap:10px;justify-content:flex-end;margin-top:20px")}>
              <button
                onClick={close}
                style={css(
                  "padding:12px 16px;border-radius:12px;border:1.5px solid #E2E4E6;background:#fff;color:#5a6460;font:700 13.5px/1 'Plus Jakarta Sans';cursor:pointer"
                )}
              >
                Cerrar
              </button>
              <button
                onClick={submit}
                disabled={loading}
                style={css(
                  "padding:12px 16px;border-radius:12px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:900 13.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 28px -10px rgba(201,163,77,.7);opacity:" +
                    (loading ? ".75" : "1")
                )}
              >
                {loading ? "Verificando..." : "Verificar ahora"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
