import { css } from "../lib/css";
import MsIcon from "./MsIcon";

export type ScreenKey = "landing" | "property" | "dashboard";

type Item = {
  key: ScreenKey;
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
};

export default function AppSwitcher({ items }: { items: Item[] }) {
  return (
    <div
      style={css(
        "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:200;display:flex;gap:4px;padding:5px;background:rgba(18,58,47,.92);backdrop-filter:blur(16px);border:1px solid rgba(201,163,77,.25);border-radius:999px;box-shadow:0 18px 50px -12px rgba(18,58,47,.6)"
      )}
    >
      {items.map((s) => (
        <button
          key={s.key}
          onClick={s.onClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 18px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "13px",
            fontFamily: "'Plus Jakarta Sans'",
            transition: ".2s",
            background: s.active ? "#C9A34D" : "transparent",
            color: s.active ? "#1a1408" : "rgba(255,255,255,.78)"
          }}
        >
          <MsIcon name={s.icon} style={{ fontSize: 18 }} />
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

