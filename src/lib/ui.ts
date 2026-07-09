export type BadgeKind = "ok" | "warn" | "info" | "danger";

export function statusKind(status: string): BadgeKind {
  const map: Record<string, BadgeKind> = {
    Disponible: "ok",
    Activo: "ok",
    Verificado: "ok",
    Respondida: "ok",
    PreAprobado: "ok",
    Preaprobado: "ok",
    Reservado: "warn",
    Reservada: "warn",
    "En revisión": "warn",
    "En revision": "warn",
    Pendiente: "danger",
    Nueva: "warn",
    Inactivo: "info",
    Alquilado: "info",
    Alquilada: "info",
    "En proceso": "warn"
  };
  return map[status] || "info";
}

export function badgeStyle(kind: BadgeKind): string {
  const palette: Record<BadgeKind, [string, string]> = {
    ok: ["#1c7a4d", "rgba(32,120,77,.13)"],
    warn: ["#9a6b12", "rgba(201,163,77,.18)"],
    info: ["#3a564c", "rgba(18,58,47,.08)"],
    danger: ["#b23b3b", "rgba(178,59,59,.12)"]
  };
  const chosen = palette[kind];
  return `display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:8px;background:${chosen[1]};color:${chosen[0]};font:700 12px/1 'Plus Jakarta Sans'`;
}
