export function formatCurrency(value: number): string {
  return (Number(value) || 0).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  });
}

export function formatDate(value: Date): string {
  return value.toLocaleDateString("es-AR");
}

export function formatRelative(value: Date): string {
  const diffMs = Math.max(0, Date.now() - value.getTime());
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.round(hours / 24);
  return `Hace ${days} día${days === 1 ? "" : "s"}`;
}

