export const HAZARD_KEYWORDS = [
  "sparks",
  "sparking",
  "smoke",
  "smoking",
  "burning smell",
  "burning",
  "burnt",
  "gas smell",
  "gas leak",
  "exposed wire",
  "live wire",
  "shock",
  "electric shock",
  "water on switch",
  "water near plug",
  "gini pupuru",
  "gini",
  "dumanawa",
  "karawena",
  "karawela",
  "thee",
  "pukay",
  "தீப்பொறி",
  "දුම",
];

export const safetyConfig = {
  // Empty by default per Honesty Rule H7
  emergencyContacts: [] as { name: string; number: string }[],
};

export function detectHazard(text: string): boolean {
  const lower = text.toLowerCase();
  return HAZARD_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}
