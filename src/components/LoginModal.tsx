import { css } from "../lib/css";
import MsIcon from "./MsIcon";

export default function LoginModal({
  open,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onClose,
  onSubmit,
  submitLabel
}: {
  open: boolean;
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  if (!open) return null;
  return (
    <div
      style={css(
        "position:fixed;inset:0;z-index:420;background:rgba(8,20,16,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px"
      )}
    >
      <div
        style={css(
          "width:min(460px,100%);background:#fff;border-radius:22px;padding:28px 28px 24px;box-shadow:0 34px 80px -24px rgba(0,0,0,.45);border:1px solid rgba(18,58,47,.08)"
        )}
      >
        <div
          style={css(
            "display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:20px"
          )}
        >
          <div>
            <div
              style={css(
                "font-family:'Schibsted Grotesk';font-weight:800;font-size:26px;color:#123A2F"
              )}
            >
              Acceso RAIES
            </div>
            <div style={css("font-size:13.5px;color:#6b7570;margin-top:6px")}>
              Ingresá con Firebase Auth para administrar propiedades, solicitudes e
              imágenes.
            </div>
          </div>
          <button
            onClick={onClose}
            style={css(
              "width:36px;height:36px;border-radius:10px;border:none;background:#F4F5F5;color:#123A2F;cursor:pointer;display:flex;align-items:center;justify-content:center"
            )}
          >
            <MsIcon name="close" style={{ fontSize: 20 }} />
          </button>
        </div>
        <div style={css("display:flex;flex-direction:column;gap:14px")}>
          <div>
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px"
              )}
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="admin@raies.com"
              style={css(
                "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
              )}
            />
          </div>
          <div>
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px"
              )}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="••••••••"
              style={css(
                "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
              )}
            />
          </div>
        </div>
        <button
          onClick={onSubmit}
          style={css(
            "width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:12px;border:none;background:linear-gradient(180deg,#D6B25C,#C9A34D);color:#1a1408;font:700 14.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 28px -10px rgba(201,163,77,.7);margin-top:20px"
          )}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

