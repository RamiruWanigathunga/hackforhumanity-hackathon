export const TIME_WINDOWS = ["morning", "afternoon", "evening", "anytime"] as const;
export type TimeWindow = (typeof TIME_WINDOWS)[number];

export const TIME_WINDOW_LABELS: Record<TimeWindow, string> = {
  morning: "Morning (08:00 – 12:00)",
  afternoon: "Afternoon (12:00 – 16:00)",
  evening: "Evening (16:00 – 19:00)",
  anytime: "Anytime",
};

export const COLOMBO_TIMEZONE = "Asia/Colombo";

/**
 * Returns today's ISO date (YYYY-MM-DD) in Asia/Colombo timezone.
 */
export function getColomboToday(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: COLOMBO_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now);
}

/**
 * Returns offset day ISO date in Asia/Colombo timezone (+1 for tomorrow, +2 for day after).
 */
export function getColomboOffsetDate(offsetDays: number): string {
  const now = new Date();
  const future = new Date(now.getTime() + offsetDays * 24 * 60 * 60 * 1000);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: COLOMBO_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(future);
}

/**
 * Resolves natural language day strings to ISO YYYY-MM-DD in Colombo time.
 */
export function resolveRelativeDay(dayString: string, todayIso: string = getColomboToday()): string | null {
  const lower = dayString.toLowerCase().trim();
  if (lower.includes("today") || lower.includes("ada") || lower.includes("indru") || lower === "අද") {
    return todayIso;
  }

  if (
    lower.includes("tomorrow") ||
    lower.includes("heta") ||
    lower.includes("naalai") ||
    lower === "හෙට" ||
    lower === "நாளை"
  ) {
    const today = new Date(`${todayIso}T12:00:00Z`);
    today.setUTCDate(today.getUTCDate() + 1);
    return today.toISOString().split("T")[0];
  }

  if (lower.includes("day after") || lower.includes("anidda") || lower === "අනිද්දා") {
    const today = new Date(`${todayIso}T12:00:00Z`);
    today.setUTCDate(today.getUTCDate() + 2);
    return today.toISOString().split("T")[0];
  }

  // Already YYYY-MM-DD?
  if (/^\d{4}-\d{2}-\d{2}$/.test(lower)) {
    return lower;
  }

  return null;
}
