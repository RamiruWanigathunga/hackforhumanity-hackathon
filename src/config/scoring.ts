export const SCORING_WEIGHTS = {
  service: 40,
  availability: 25,
  area: 20,
  rating: 10,
  language: 5,
} as const;

export type ScoreComponentKey = keyof typeof SCORING_WEIGHTS;
