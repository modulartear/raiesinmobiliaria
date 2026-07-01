import type { CSSProperties } from "react";

export function css(styleText: string | undefined | null): CSSProperties {
  if (!styleText) return {};
  const out: Record<string, string> = {};
  const parts = styleText.split(";");
  for (const decl of parts) {
    const idx = decl.indexOf(":");
    if (idx < 0) continue;
    const prop = decl.slice(0, idx).trim();
    const val = decl.slice(idx + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[key] = val;
  }
  return out as unknown as CSSProperties;
}
