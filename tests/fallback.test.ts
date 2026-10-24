import { describe, it, expect } from "vitest";
import { fallbackParse } from "../src/server/ai/fallback";

describe("Fallback Parser Heuristics", () => {
  it("parses Demo Input 1: English kitchen sink leak", () => {
    const input = "My kitchen sink pipe is leaking under the counter, need someone tomorrow morning";
    const result = fallbackParse(input);

    expect(result.category).toBe("plumbing");
    expect(result.tags).toContain("leak");
    expect(result.tags).toContain("pipe");
    expect(result.detectedLanguage).toBe("en");
    expect(result.preferredWindow).toBe("morning");
    expect(result.hazard).toBe(false);
  });

  it("parses Demo Input 2: Singlish ceiling fan with burning smell hazard", () => {
    const input = "fan eka karakenne na, switch eken burning smell ekak enawa";
    const result = fallbackParse(input);

    expect(result.category).toBe("electrical");
    expect(result.tags).toContain("ceiling_fan");
    expect(result.tags).toContain("burning_smell");
    expect(result.detectedLanguage).toBe("singlish");
    expect(result.hazard).toBe(true);
    expect(result.urgency).toBe("high");
  });

  it("parses Demo Input 3: Sinhala AC not cooling", () => {
    const input = "AC එක හරියට සීතල වෙන්නේ නැහැ, හෙට හවස එන්න පුළුවන්ද?";
    const result = fallbackParse(input);

    expect(result.category).toBe("ac_appliance");
    expect(result.tags).toContain("ac_not_cooling");
    expect(result.detectedLanguage).toBe("si");
    expect(result.preferredWindow).toBe("evening");
  });

  it("parses Demo Input 4: Tamil bathroom pipe leak", () => {
    const input = "குளியලறை குழாய் ஒழுகுகிறது, நாளை காலை வர முடியுமா?";
    const result = fallbackParse(input);

    expect(result.category).toBe("plumbing");
    expect(result.tags).toContain("leak");
    expect(result.detectedLanguage).toBe("ta");
    expect(result.preferredWindow).toBe("morning");
  });

  it("parses Demo Input 6: Main switch tripping", () => {
    const input = "Main switch keeps tripping when I turn on the kettle";
    const result = fallbackParse(input);

    expect(result.category).toBe("electrical");
    expect(result.tags).toContain("tripping");
    expect(result.hazard).toBe(false);
  });
});
