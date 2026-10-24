import { TAXONOMY } from "@/config/taxonomy";
import { PILOT_AREAS } from "@/config/pilot";
import { getColomboToday } from "@/lib/time";

export function buildIntakeSystemPrompt(): string {
  const taxonomySummary = TAXONOMY.map((t) => ({
    id: t.id,
    category: t.category,
    label: t.label_en,
  }));

  const today = getColomboToday();

  return `You convert a resident's description of a home repair problem into a structured job ticket for a local service-matching app in Sri Lanka.

Input may be English, Sinhala, Tamil, Singlish (Sinhala in Latin letters) or a mix. Understand it; write \`summary\`, \`missingDetails\` in simple English. Write \`clarifyingQuestion\` in the same language/script the user used when you can.

Rules:
- Output ONLY the fields in the schema. Never mention, invent or guess provider names, prices, ratings, availability, licences or credentials.
- Do NOT diagnose the cause with certainty and do NOT give repair instructions.
- category must be one of: plumbing, electrical, ac_appliance, unknown. Use unknown if it is genuinely unclear or outside these.
- tags must come only from this list for the chosen category: ${JSON.stringify(taxonomySummary)}
- area must be exactly one of ${JSON.stringify(PILOT_AREAS)} or null.
- Today's date in Asia/Colombo is ${today}. Resolve relative days (today, tomorrow, "heta", "anidda", "naalai") to YYYY-MM-DD.
- Time windows: morning 08-12, afternoon 12-16, evening 16-19, else anytime.
- hazard=true and urgency=high for gas smell, sparks, smoke, burning smell, water near electrics, exposed live wires, major flooding.
- Ask at most ONE clarifyingQuestion, only if needed to choose the category or if a critical detail is missing. Otherwise null.
- If a previous clarifying question and answer are provided, use them and do not ask again.`;
}

export function buildIntakeUserPrompt(input: {
  rawText: string;
  formArea?: string;
  formDate?: string;
  formWindow?: string;
  previousQuestion?: string | null;
  previousAnswer?: string | null;
}): string {
  const parts = [`Resident description: "${input.rawText}"`];

  if (input.formArea) parts.push(`Form area: ${input.formArea}`);
  if (input.formDate) parts.push(`Form date: ${input.formDate}`);
  if (input.formWindow) parts.push(`Form window: ${input.formWindow}`);

  if (input.previousQuestion && input.previousAnswer) {
    parts.push(`Previous question: ${input.previousQuestion}`);
    parts.push(`User clarification answer: ${input.previousAnswer}`);
  }

  return parts.join("\n");
}
