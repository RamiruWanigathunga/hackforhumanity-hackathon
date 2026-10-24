import { JobTicket, Provider, ProviderSlot } from "@/server/db/schema";
import {
  computeServiceScore,
  computeAvailabilityScore,
  computeAreaScore,
  computeRatingScore,
  computeLanguageScore,
  calculateWeightedTotal,
} from "./score";
import { TAXONOMY } from "@/config/taxonomy";

export interface MatchResultItem {
  provider: Provider;
  total: number;
  components: {
    service: number;
    availability: number;
    area: number;
    rating: number;
    language: number;
  };
  reasons: string[];
  suggestedSlots: ProviderSlot[];
}

export interface MatchOutput {
  matches: MatchResultItem[];
  emptyReason?: string;
}

export function rankProviders(
  ticket: JobTicket,
  providersWithSlots: { provider: Provider; slots: ProviderSlot[] }[]
): MatchOutput {
  if (ticket.category === "unknown") {
    return {
      matches: [],
      emptyReason: "Ticket category is unknown. Please select a repair category to match providers.",
    };
  }

  const results: MatchResultItem[] = [];

  for (const item of providersWithSlots) {
    const { provider, slots } = item;

    // Hard Filter 1: Category
    if (!provider.categories.includes(ticket.category)) {
      continue;
    }

    // Hard Filter 2: Area (direct or adjacent)
    const areaEval = computeAreaScore(ticket.area, provider.areasServed);
    if (areaEval.score === 0) {
      continue;
    }

    // Hard Filter 3: Has available slots
    if (slots.length === 0) {
      continue;
    }

    // Component scores
    const serviceNorm = computeServiceScore(ticket.tags, provider.tags);
    const availEval = computeAvailabilityScore(ticket.preferredDate, ticket.preferredWindow, slots);
    const ratingNorm = computeRatingScore(provider.rating);
    const langNorm = computeLanguageScore(ticket.detectedLanguage, provider.languages);

    const { total, points } = calculateWeightedTotal({
      service: serviceNorm,
      availability: availEval.score,
      area: areaEval.score,
      rating: ratingNorm,
      language: langNorm,
    });

    // Generate Human-Readable Reasons
    const reasons: string[] = [];

    // Tag reasons
    const matchingTagLabels = ticket.tags
      .filter((t) => provider.tags.includes(t))
      .map((t) => TAXONOMY.find((item) => item.id === t)?.label_en || t);
    if (matchingTagLabels.length > 0) {
      reasons.push(`Handles ${matchingTagLabels.slice(0, 2).join(" & ")}`);
    } else {
      reasons.push(`Experienced with ${ticket.category.replace(/_/g, " ")}`);
    }

    // Availability reasons
    if (availEval.bestSlot) {
      if (availEval.bestSlot.date === ticket.preferredDate) {
        reasons.push(`Free ${availEval.bestSlot.window} on preferred date`);
      } else {
        reasons.push(`Slot available on ${availEval.bestSlot.date}`);
      }
    }

    // Area reasons
    if (areaEval.isDirect && ticket.area) {
      reasons.push(`Serves ${ticket.area} directly`);
    } else if (areaEval.isAdjacent) {
      reasons.push(`Serves near ${ticket.area || "your area"}`);
    }

    // Language reasons
    const lang = ticket.detectedLanguage;
    if ((lang === "si" || lang === "singlish") && provider.languages.includes("si")) {
      reasons.push("Speaks Sinhala");
    } else if (lang === "ta" && provider.languages.includes("ta")) {
      reasons.push("Speaks Tamil");
    } else if (provider.languages.includes("en")) {
      reasons.push("Speaks English");
    }

    // Suggested slots (up to 3 best)
    const suggestedSlots = slots.slice(0, 3);

    results.push({
      provider,
      total,
      components: points,
      reasons,
      suggestedSlots,
    });
  }

  // Sort by total desc, then rating desc
  results.sort((a, b) => {
    if (b.total !== a.total) {
      return b.total - a.total;
    }
    return parseFloat(b.provider.rating) - parseFloat(a.provider.rating);
  });

  const topMatches = results.slice(0, 5);

  if (topMatches.length === 0) {
    return {
      matches: [],
      emptyReason: `No active ${ticket.category.replace(/_/g, " ")} specialists found serving ${ticket.area || "your area"} with available slots in the next 3 days. Try widening your area or choosing a different date.`,
    };
  }

  return { matches: topMatches };
}
