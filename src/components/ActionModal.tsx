import { css } from "../lib/css";
import MsIcon from "./MsIcon";

export type ActionModalKind = "consult" | "request" | "verification" | "chat";

export type ActionFormState = {
  name: string;
  email: string;
  phone: string;
  monthlyIncome: string;
  message: string;
};

export default function ActionModal({
  open,
  title,
  subtitle,
  form,
  onChange,
  onClose,
  onSubmit,
  submitLabel
}: {
  open: boolean;
  title: string;
  subtitle: string;
  form: ActionFormState;
  onChange: (patch: Partial<ActionFormState>) => void;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  if (!open) return null;
  return (
    <div
      style={css(
        "position:fixed;inset:0;z-index:410;background:rgba(8,20,16,.62);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px"
      )}
    >
      <div
        style={css(
          "width:min(520px,100%);background:#fff;border-radius:22px;padding:28px 28px 24px;box-shadow:0 34px 80px -24px rgba(0,0,0,.45);border:1px solid rgba(18,58,47,.08)"
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
                "font-family:'Schibsted Grotesk';font-weight:800;font-size:24px;color:#123A2F"
              )}
            >
              {title}
            </div>
            <div style={css("font-size:13.5px;color:#6b7570;margin-top:6px")}>
              {subtitle}
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
        <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:14px")}>
          <div>
            <label
              style={css(
                "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px"
              )}
            >
              Nombre
            </label>
            <input
              value={form.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Tu nombre"
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
              Email
            </label>
            <input
              value={form.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="nombre@email.com"
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
              Teléfono
            </label>
            <input
              value={form.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+54..."
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
              Ingreso mensual
            </label>
            <input
              value={form.monthlyIncome}
              onChange={(e) => onChange({ monthlyIncome: e.target.value })}
              placeholder="$ 0"
              style={css(
                "width:100%;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none"
              )}
            />
          </div>
        </div>
        <div style={css("margin-top:14px")}>
          <label
            style={css(
              "display:block;font:600 12.5px/1 'Plus Jakarta Sans';color:#123A2F;margin-bottom:8px"
            )}
          >
            Mensaje
          </label>
          <textarea
            value={form.message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder="Contanos en qué podemos ayudarte..."
            style={css(
              "width:100%;min-height:104px;padding:13px 14px;border-radius:11px;border:1.5px solid #E2E4E6;background:#F8F9FA;font:500 14px 'Plus Jakarta Sans';color:#333;outline:none;resize:vertical"
            )}
          />
        </div>
        <button
          onClick={onSubmit}
          style={css(
            "width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border-radius:12px;border:none;background:#123A2F;color:#fff;font:700 14.5px/1 'Plus Jakarta Sans';cursor:pointer;box-shadow:0 12px 26px -12px rgba(18,58,47,.55);margin-top:20px"
          )}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

