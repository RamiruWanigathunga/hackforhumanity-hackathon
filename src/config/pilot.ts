export const PILOT_NAME = "Nugegoda & surrounds";

export const PILOT_AREAS = [
  "Nugegoda",
  "Gangodawila",
  "Mirihana",
  "Pagoda",
  "Delkanda",
  "Udahamulla",
  "Kirulapone",
] as const;

export type PilotArea = (typeof PILOT_AREAS)[number];

// Undirected adjacency map for pilot areas
export const PILOT_ADJACENCY: Record<PilotArea, PilotArea[]> = {
  Nugegoda: ["Gangodawila", "Mirihana", "Pagoda", "Kirulapone"],
  Gangodawila: ["Nugegoda", "Delkanda", "Pagoda"],
  Mirihana: ["Nugegoda", "Udahamulla"],
  Pagoda: ["Nugegoda", "Gangodawila"],
  Delkanda: ["Gangodawila", "Udahamulla"],
  Udahamulla: ["Mirihana", "Delkanda"],
  Kirulapone: ["Nugegoda"],
};

export function isDirectOrAdjacent(targetArea: string, providerAreasServed: string[]): {
  isMatch: boolean;
  isDirect: boolean;
  isAdjacent: boolean;
} {
  const isDirect = providerAreasServed.includes(targetArea);
  if (isDirect) {
    return { isMatch: true, isDirect: true, isAdjacent: false };
  }

  const adjacentAreas = (PILOT_ADJACENCY as Record<string, string[]>)[targetArea] || [];
  const isAdjacent = providerAreasServed.some((a) => adjacentAreas.includes(a));
  return {
    isMatch: isAdjacent,
    isDirect: false,
    isAdjacent,
  };
}
