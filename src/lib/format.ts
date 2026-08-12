export function formatMatchDate(value: string, locale = "pt-BR") {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data indisponível";
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function occupancyPercentage(confirmed: number, capacity: number) {
  if (capacity <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((confirmed / capacity) * 100)));
}
