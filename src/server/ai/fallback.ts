import { TicketDraft } from "@/lib/schemas";
import { TAXONOMY, Category } from "@/config/taxonomy";
import { PILOT_AREAS, PilotArea } from "@/config/pilot";
import { detectHazard } from "@/config/safety";
import { getColomboToday, resolveRelativeDay } from "@/lib/time";

export function fallbackParse(
  rawText: string,
  formDefaults?: { area?: string; preferredDate?: string; preferredWindow?: string }
): TicketDraft {
  const lower = rawText.toLowerCase();

  // 1. Language Detection
  let detectedLanguage: "en" | "si" | "ta" | "singlish" | "mixed" | "unknown" = "en";
  const hasSinhala = /[\u0D80-\u0DFF]/.test(rawText);
  const hasTamil = /[\u0B80-\u0BFF]/.test(rawText);

  if (hasSinhala && hasTamil) {
    detectedLanguage = "mixed";
  } else if (hasSinhala) {
    detectedLanguage = "si";
  } else if (hasTamil) {
    detectedLanguage = "ta";
  } else {
    // Check for Singlish keywords
    const singlishWords = ["eka", "na", "naha", "wenne", "karakenne", "vathura", "enawa", "heta", "ada", "ganna", "puluwanda"];
    const matchesSinglish = singlishWords.some((w) => lower.split(/\s+/).includes(w));
    if (matchesSinglish) {
      detectedLanguage = "singlish";
    }
  }

  // 2. Hazard Detection
  const hazard = detectHazard(rawText);
  const urgency = hazard ? "high" : "normal";

  // 3. Taxonomy matching & Category score
  const categoryScores: Record<string, number> = {
    plumbing: 0,
    electrical: 0,
    ac_appliance: 0,
  };
  const matchedTags: string[] = [];

  for (const item of TAXONOMY) {
    let hit = false;
    for (const kw of item.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        hit = true;
        break;
      }
    }
    if (hit) {
      categoryScores[item.category] = (categoryScores[item.category] || 0) + 1;
      matchedTags.push(item.id);
    }
  }

  // Pick top category
  let topCategory: Category = "unknown";
  let maxScore = 0;
  for (const [cat, score] of Object.entries(categoryScores)) {
    if (score > maxScore) {
      maxScore = score;
      topCategory = cat as Category;
    }
  }

  // Filter tags to top category (limit 4)
  const finalTags = matchedTags
    .filter((tid) => {
      const def = TAXONOMY.find((t) => t.id === tid);
      return def && def.category === topCategory;
    })
    .slice(0, 4);

  // 4. Area Detection
  let resolvedArea: PilotArea | null = null;
  if (formDefaults?.area && (PILOT_AREAS as readonly string[]).includes(formDefaults.area)) {
    resolvedArea = formDefaults.area as PilotArea;
  } else {
    for (const a of PILOT_AREAS) {
      if (lower.includes(a.toLowerCase())) {
        resolvedArea = a;
        break;
      }
    }
  }

  // 5. Date & Time Window Detection
  let preferredDate: string | null = null;
  if (formDefaults?.preferredDate) {
    preferredDate = resolveRelativeDay(formDefaults.preferredDate);
  }
  if (!preferredDate) {
    preferredDate = resolveRelativeDay(rawText, getColomboToday());
  }

  let preferredWindow: "morning" | "afternoon" | "evening" | "anytime" = "anytime";
  if (
    formDefaults?.preferredWindow &&
    ["morning", "afternoon", "evening", "anytime"].includes(formDefaults.preferredWindow)
  ) {
    preferredWindow = formDefaults.preferredWindow as "morning" | "afternoon" | "evening" | "anytime";
  } else {
    if (/morning|udee|kaalai|උදේ|காலை/.test(lower)) {
      preferredWindow = "morning";
    } else if (/afternoon|dawal|மதியம்|දහවල්/.test(lower)) {
      preferredWindow = "afternoon";
    } else if (/evening|hawasa|haweta|maalai|හවස|மாலை/.test(lower)) {
      preferredWindow = "evening";
    }
  }

  // 6. Summary: Clean first 140 chars
  const summary = rawText.replace(/\s+/g, " ").trim().slice(0, 140);

  return {
    summary,
    category: topCategory,
    tags: finalTags,
    area: resolvedArea,
    preferredDate,
    preferredWindow,
    urgency,
    hazard,
    detectedLanguage,
    missingDetails: topCategory === "unknown" ? ["Please specify the exact trade or repair issue"] : [],
    clarifyingQuestion: null,
    confidence: maxScore > 0 ? 0.7 : 0.4,
  };
}
