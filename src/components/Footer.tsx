import { css } from "../lib/css";
import { logoRaiesUrl } from "../lib/assets";
import type { SettingsRecord } from "../data/models";
import MsIcon from "./MsIcon";

export default function Footer({
  settings,
  onOpenWhatsapp
}: {
  settings: SettingsRecord;
  onOpenWhatsapp: () => void;
}) {
  return (
    <footer
      style={css(
        "margin-top:90px;background:linear-gradient(125deg,#0d2c23 0%,#123A2F 55%,#1c5040 100%);color:#fff"
      )}
    >
      <div style={css("max-width:1240px;margin:0 auto;padding:58px 5vw 32px")}>
        <div
          style={css(
            "display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:28px;align-items:start"
          )}
        >
          <div>
            <div style={css("display:flex;align-items:center;gap:14px;margin-bottom:14px")}>
              <span
                style={css(
                  "width:54px;height:54px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 10px 26px -12px rgba(0,0,0,.55)"
                )}
              >
                <img
                  src={logoRaiesUrl}
                  alt="RAIES"
                  style={css("width:100%;height:100%;object-fit:cover")}
                />
              </span>
              <div>
                <div
                  style={css(
                    "font-family:'Schibsted Grotesk';font-weight:800;font-size:18px;letter-spacing:-.01em"
                  )}
                >
                  {settings.name}
                </div>
                <div style={css("font-size:12.5px;color:rgba(255,255,255,.75);margin-top:2px")}>
                  Alquileres verificados · Propiedades destacadas
                </div>
              </div>
            </div>
            <p style={css("margin:0;color:rgba(255,255,255,.78);font-size:13.5px;line-height:1.55;max-width:520px")}>
              Centralizá consultas, solicitudes, publicaciones e imágenes en una sola plataforma.
              Seguridad, velocidad y trazabilidad para tu inmobiliaria.
            </p>
            <button
              onClick={onOpenWhatsapp}
              style={css(
                "margin-top:18px;display:inline-flex;align-items:center;gap:9px;padding:12px 18px;border-radius:12px;border:1.5px solid rgba(255,255,255,.26);background:rgba(255,255,255,.08);backdrop-filter:blur(10px);color:#fff;font:700 13.5px/1 'Plus Jakarta Sans';cursor:pointer;transition:.2s"
              )}
            >
              <MsIcon name="chat" style={{ fontSize: 18 }} />
              Hablar por WhatsApp
            </button>
          </div>

          <div>
            <div style={css("font:800 12px/1 'Plus Jakarta Sans';letter-spacing:.12em;color:#E7CE92;margin-bottom:14px")}>
              CONTACTO
            </div>
            <div style={css("display:flex;flex-direction:column;gap:10px;font-size:13.5px;color:rgba(255,255,255,.82)")}>
              <div style={css("display:flex;align-items:center;gap:10px")}>
                <MsIcon name="mail" style={{ fontSize: 18, color: "#C9A34D" }} />
                <span>{settings.email}</span>
              </div>
              <div style={css("display:flex;align-items:center;gap:10px")}>
                <MsIcon name="call" style={{ fontSize: 18, color: "#C9A34D" }} />
                <span>{settings.phone}</span>
              </div>
              <div style={css("display:flex;align-items:flex-start;gap:10px")}>
                <MsIcon name="location_on" style={{ fontSize: 18, color: "#C9A34D", marginTop: 1 }} />
                <span style={css("line-height:1.45")}>{settings.address}</span>
              </div>
            </div>
          </div>

          <div>
            <div style={css("font:800 12px/1 'Plus Jakarta Sans';letter-spacing:.12em;color:#E7CE92;margin-bottom:14px")}>
              SECCIONES
            </div>
            <div style={css("display:flex;flex-direction:column;gap:10px")}>
              {["Inicio", "Propiedades", "Requisitos", "Cómo alquilar", "Contacto"].map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={css(
                    "color:rgba(255,255,255,.78);text-decoration:none;font:600 13.5px/1.2 'Plus Jakarta Sans';transition:.15s"
                  )}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={css(
            "margin-top:38px;padding-top:18px;border-top:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"
          )}
        >
          <div style={css("font-size:12.5px;color:rgba(255,255,255,.68)")}>
            © {new Date().getFullYear()} {settings.name}. Todos los derechos reservados.
          </div>
          <div style={css("display:flex;align-items:center;gap:14px;color:rgba(255,255,255,.62);font-size:12.5px")}>
            <span style={css("display:inline-flex;align-items:center;gap:6px")}>
              <span style={css("width:7px;height:7px;border-radius:50%;background:#C9A34D")} />
              Hecho con orgullo en Venado Tuerto por{" "}
              <a
                href="https://disearte.vercel.app/"
                target="_blank"
                rel="noreferrer"
                style={css("color:#E7CE92;text-decoration:none;font-weight:700")}
              >
                DiseArte
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
