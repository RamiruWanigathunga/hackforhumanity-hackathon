import { describe, it, expect } from "vitest";
import {
  computeServiceScore,
  computeAvailabilityScore,
  computeAreaScore,
  computeRatingScore,
  computeLanguageScore,
  calculateWeightedTotal,
} from "../src/server/matching/score";
import { SCORING_WEIGHTS } from "../src/config/scoring";

describe("Deterministic Scoring Components", () => {
  it("weights sum exactly to 100", () => {
    const sum =
      SCORING_WEIGHTS.service +
      SCORING_WEIGHTS.availability +
      SCORING_WEIGHTS.area +
      SCORING_WEIGHTS.rating +
      SCORING_WEIGHTS.language;
    expect(sum).toBe(100);
  });

  it("calculates service score with tag overlap", () => {
    // 0 tags -> 0.8 baseline
    expect(computeServiceScore([], ["leak"])).toBe(0.8);
    // 1 of 2 match -> 0.6 + 0.4 * 0.5 = 0.8
    expect(computeServiceScore(["leak", "pipe"], ["leak"])).toBe(0.8);
    // Full match -> 1.0
    expect(computeServiceScore(["leak", "pipe"], ["leak", "pipe"])).toBe(1.0);
  });

  it("calculates area score: direct = 1.0, adjacent = 0.5, unrelated = 0", () => {
    // Direct match
    expect(computeAreaScore("Nugegoda", ["Nugegoda", "Mirihana"]).score).toBe(1.0);
    // Adjacent: Gangodawila is adjacent to Nugegoda
    expect(computeAreaScore("Gangodawila", ["Nugegoda"]).score).toBe(0.5);
    // Unrelated: Kirulapone not adjacent to Delkanda directly
    expect(computeAreaScore("Kirulapone", ["Delkanda"]).score).toBe(0);
  });

  it("calculates availability score based on date and window", () => {
    const slots = [
      { id: "s1", providerId: "p1", date: "2026-10-25", window: "morning", status: "available" },
      { id: "s2", providerId: "p1", date: "2026-10-25", window: "afternoon", status: "available" },
    ];
    // Exact match
    const exact = computeAvailabilityScore("2026-10-25", "morning", slots);
    expect(exact.score).toBe(1.0);
    expect(exact.bestSlot?.id).toBe("s1");

    // Other window
    const otherWindow = computeAvailabilityScore("2026-10-25", "evening", slots);
    expect(otherWindow.score).toBe(0.7);
  });

  it("calculates rating score normalized between 3 and 5", () => {
    expect(computeRatingScore(5.0)).toBe(1.0);
    expect(computeRatingScore(4.0)).toBe(0.5);
    expect(computeRatingScore(3.0)).toBe(0.0);
  });

  it("calculates language match score", () => {
    expect(computeLanguageScore("si", ["si", "en"])).toBe(1.0);
    expect(computeLanguageScore("ta", ["ta", "en"])).toBe(1.0);
    expect(computeLanguageScore("singlish", ["si"])).toBe(1.0);
    expect(computeLanguageScore("unknown", ["en"])).toBe(0.5);
  });

  it("calculates weighted total score clamped to 0-100", () => {
    const result = calculateWeightedTotal({
      service: 1.0,
      availability: 1.0,
      area: 1.0,
      rating: 1.0,
      language: 1.0,
    });
    expect(result.total).toBe(100);
  });
});
