export function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function isInPast(dateStr?: string) {
  return new Date(`${dateStr}T00:00:00`) < new Date();
}

export function isOlderThanMonths(dateStr: string, months: number) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return new Date(`${dateStr}T00:00:00`) < cutoff;
}
