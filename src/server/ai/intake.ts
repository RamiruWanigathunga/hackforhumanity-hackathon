import "server-only";
import { generateObject } from "ai";
import { TicketDraft, TicketDraftSchema } from "@/lib/schemas";
import { getAiModel } from "./client";
import { buildIntakeSystemPrompt, buildIntakeUserPrompt } from "./prompt";
import { fallbackParse } from "./fallback";
import { isValidTag, Category } from "@/config/taxonomy";
import { PILOT_AREAS, PilotArea } from "@/config/pilot";
import { env } from "../env";

export interface IntakeInput {
  rawText: string;
  area?: string;
  preferredDate?: string;
  preferredWindow?: string;
  clarificationQ?: string | null;
  clarificationA?: string | null;
}

export interface IntakeResult {
  draft: TicketDraft;
  source: "ai" | "fallback";
  rawAiResponse?: unknown;
}

export async function processIntake(input: IntakeInput): Promise<IntakeResult> {
  const model = getAiModel();

  if (!model || model === "mock") {
    const fallbackDraft = fallbackParse(input.rawText, {
      area: input.area,
      preferredDate: input.preferredDate,
      preferredWindow: input.preferredWindow,
    });
    return {
      draft: fallbackDraft,
      source: "fallback",
    };
  }

  try {
    const system = buildIntakeSystemPrompt();
    const prompt = buildIntakeUserPrompt({
      rawText: input.rawText,
      formArea: input.area,
      formDate: input.preferredDate,
      formWindow: input.preferredWindow,
      previousQuestion: input.clarificationQ,
      previousAnswer: input.clarificationA,
    });

    const timeoutMs = env.AI_TIMEOUT_MS || 12000;

    const result = await generateObject({
      model: model as any,
      schema: TicketDraftSchema,
      system,
      prompt,
      temperature: 0.2,
      maxRetries: 1,
      abortSignal: AbortSignal.timeout(timeoutMs),
    });

    const aiObject = result.object;

    // Post-process & sanitize
    const category: Category = aiObject.category;
    const sanitizedTags = (aiObject.tags || []).filter((tag) => isValidTag(tag, category)).slice(0, 4);

    let sanitizedArea: PilotArea | null = null;
    if (input.area && (PILOT_AREAS as readonly string[]).includes(input.area)) {
      sanitizedArea = input.area as PilotArea;
    } else if (aiObject.area && (PILOT_AREAS as readonly string[]).includes(aiObject.area)) {
      sanitizedArea = aiObject.area as PilotArea;
    }

    const finalDraft: TicketDraft = {
      summary: (aiObject.summary || input.rawText).slice(0, 160),
      category,
      tags: sanitizedTags,
      area: sanitizedArea,
      preferredDate: input.preferredDate || aiObject.preferredDate,
      preferredWindow: (input.preferredWindow as any) || aiObject.preferredWindow || "anytime",
      urgency: aiObject.urgency || "normal",
      hazard: Boolean(aiObject.hazard),
      detectedLanguage: aiObject.detectedLanguage || "unknown",
      missingDetails: (aiObject.missingDetails || []).slice(0, 3),
      clarifyingQuestion: input.clarificationA ? null : aiObject.clarifyingQuestion,
      confidence: typeof aiObject.confidence === "number" ? aiObject.confidence : 0.8,
    };

    return {
      draft: finalDraft,
      source: "ai",
      rawAiResponse: aiObject,
    };
  } catch (error) {
    console.warn("AI intake invocation failed, using fallback parser:", error);
    const fallbackDraft = fallbackParse(input.rawText, {
      area: input.area,
      preferredDate: input.preferredDate,
      preferredWindow: input.preferredWindow,
    });
    return {
      draft: fallbackDraft,
      source: "fallback",
    };
  }
}
