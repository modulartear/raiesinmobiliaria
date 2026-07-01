import { css } from "../lib/css";

export default function Toast({
  message,
  kind
}: {
  message: string;
  kind: "error" | "notice";
}) {
  if (!message) return null;
  if (kind === "error") {
    return (
      <div
        style={css(
          "position:fixed;top:22px;right:22px;z-index:430;max-width:420px;padding:14px 18px;border-radius:14px;background:#fff3f1;border:1px solid rgba(178,59,59,.18);box-shadow:0 18px 40px -18px rgba(0,0,0,.24);color:#8c2d2d;font:600 13px/1.45 'Plus Jakarta Sans'"
        )}
      >
        {message}
      </div>
    );
  }
  return (
    <div
      style={css(
        "position:fixed;top:22px;left:22px;z-index:425;max-width:420px;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.94);border:1px solid rgba(18,58,47,.09);box-shadow:0 18px 40px -18px rgba(0,0,0,.18);color:#123A2F;font:600 12.5px/1.45 'Plus Jakarta Sans'"
      )}
    >
      {message}
    </div>
  );
}

