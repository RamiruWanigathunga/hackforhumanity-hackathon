import { SCORING_WEIGHTS } from "@/config/scoring";
import { isDirectOrAdjacent } from "@/config/pilot";
import { ProviderSlot } from "@/server/db/schema";

/**
 * Service score (0 to 1): baseline 0.6 for category match + 0.4 proportional to tag overlap.
 */
export function computeServiceScore(ticketTags: string[], providerTags: string[]): number {
  if (ticketTags.length === 0) return 0.8; // Category match with general needs
  const overlap = ticketTags.filter((t) => providerTags.includes(t)).length;
  return 0.6 + 0.4 * (overlap / Math.max(1, ticketTags.length));
}

/**
 * Availability score (0 to 1):
 * - Exact date + exact window: 1.0
 * - Exact date, other window or anytime: 0.7
 * - Within +/- 1 day: 0.4
 * - Within 3 days: 0.2
 * - If no preferred date: earliest slot today=1.0, tomorrow=0.7, later=0.4
 */
export function computeAvailabilityScore(
  preferredDate: string | null,
  preferredWindow: string | null,
  availableSlots: ProviderSlot[]
): { score: number; bestSlot: ProviderSlot | null } {
  if (availableSlots.length === 0) {
    return { score: 0, bestSlot: null };
  }

  let bestScore = 0;
  let bestSlot: ProviderSlot | null = null;

  for (const slot of availableSlots) {
    let slotScore = 0.2; // Baseline for being available within window

    if (preferredDate) {
      if (slot.date === preferredDate) {
        if (!preferredWindow || preferredWindow === "anytime" || slot.window === preferredWindow) {
          slotScore = 1.0;
        } else {
          slotScore = 0.7;
        }
      } else {
        // Date diff in days
        const diffDays = Math.abs(
          (new Date(slot.date).getTime() - new Date(preferredDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays <= 1) {
          slotScore = 0.4;
        } else {
          slotScore = 0.2;
        }
      }
    } else {
      // No preferred date specified
      slotScore = 0.7;
    }

    if (slotScore > bestScore) {
      bestScore = slotScore;
      bestSlot = slot;
    }
  }

  return { score: bestScore, bestSlot };
}

/**
 * Area proximity score: 1.0 if direct match in areas served, 0.5 if adjacent area.
 */
export function computeAreaScore(
  ticketArea: string | null,
  areasServed: string[]
): { score: number; isDirect: boolean; isAdjacent: boolean } {
  if (!ticketArea) return { score: 0.7, isDirect: false, isAdjacent: false };
  const check = isDirectOrAdjacent(ticketArea, areasServed);
  if (check.isDirect) {
    return { score: 1.0, isDirect: true, isAdjacent: false };
  }
  if (check.isAdjacent) {
    return { score: 0.5, isDirect: false, isAdjacent: true };
  }
  return { score: 0, isDirect: false, isAdjacent: false };
}

/**
 * Rating score (0 to 1): (rating - 3) / 2 clamped between 0 and 1.
 */
export function computeRatingScore(rating: number | string): number {
  const num = typeof rating === "string" ? parseFloat(rating) : rating;
  if (isNaN(num)) return 0.5;
  const normalized = (num - 3.0) / 2.0;
  return Math.max(0, Math.min(1, normalized));
}

/**
 * Language score (0 to 1):
 * - 1.0 if provider speaks resident's language
 * - 0.5 if mixed or unknown
 */
export function computeLanguageScore(
  detectedLanguage: string,
  providerLanguages: string[]
): number {
  const lang = detectedLanguage.toLowerCase();
  const provLangs = providerLanguages.map((l) => l.toLowerCase());

  if (lang === "si" || lang === "singlish") {
    return provLangs.includes("si") ? 1.0 : provLangs.includes("en") ? 0.6 : 0.2;
  }
  if (lang === "ta") {
    return provLangs.includes("ta") ? 1.0 : provLangs.includes("en") ? 0.6 : 0.2;
  }
  if (lang === "en") {
    return provLangs.includes("en") ? 1.0 : 0.5;
  }
  return 0.5;
}

export function calculateWeightedTotal(components: {
  service: number;
  availability: number;
  area: number;
  rating: number;
  language: number;
}) {
  const points = {
    service: components.service * SCORING_WEIGHTS.service,
    availability: components.availability * SCORING_WEIGHTS.availability,
    area: components.area * SCORING_WEIGHTS.area,
    rating: components.rating * SCORING_WEIGHTS.rating,
    language: components.language * SCORING_WEIGHTS.language,
  };

  const total = Math.round(
    points.service + points.availability + points.area + points.rating + points.language
  );

  return {
    total: Math.max(0, Math.min(100, total)),
    points,
  };
}
