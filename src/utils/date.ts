export function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isInPast(dateStr?: string) {
  return new Date(`${dateStr}T00:00:00`) < new Date();
}
