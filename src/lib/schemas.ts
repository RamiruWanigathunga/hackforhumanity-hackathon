import { z } from "zod";
import { PILOT_AREAS } from "@/config/pilot";

export const CATEGORY_ENUM = ["plumbing", "electrical", "ac_appliance", "unknown"] as const;
export const WINDOW_ENUM = ["morning", "afternoon", "evening", "anytime"] as const;
export const URGENCY_ENUM = ["low", "normal", "high"] as const;
export const LANGUAGE_ENUM = ["en", "si", "ta", "singlish", "mixed", "unknown"] as const;

export const TicketDraftSchema = z.object({
  summary: z.string().max(160).describe("Brief neutral English summary describing only the issue"),
  category: z.enum(CATEGORY_ENUM).describe("One of plumbing, electrical, ac_appliance, or unknown"),
  tags: z.array(z.string()).max(4).default([]).describe("Matching taxonomy tag IDs for this category"),
  area: z.enum(PILOT_AREAS).nullable().describe("One of the pilot areas or null"),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().describe("ISO date YYYY-MM-DD in Colombo"),
  preferredWindow: z.enum(WINDOW_ENUM).default("anytime"),
  urgency: z.enum(URGENCY_ENUM).default("normal"),
  hazard: z.boolean().default(false).describe("True if sparks, burning, smoke, gas, or live electrical flood hazard"),
  detectedLanguage: z.enum(LANGUAGE_ENUM).default("unknown"),
  missingDetails: z.array(z.string()).max(3).default([]),
  clarifyingQuestion: z.string().nullable().default(null).describe("At most one question if category is unknown or detail missing"),
  confidence: z.number().min(0).max(1).default(0.8),
});

export type TicketDraft = z.infer<typeof TicketDraftSchema>;

export const DescribeFormSchema = z.object({
  rawText: z.string().min(5, "Please describe the problem in a few words").max(1000),
  area: z.string().min(1, "Please select an area"),
  preferredDay: z.enum(["today", "tomorrow", "day_after", "flexible"]).default("tomorrow"),
  preferredWindow: z.enum(WINDOW_ENUM).default("morning"),
  residentName: z.string().max(50).optional(),
});

export type DescribeForm = z.infer<typeof DescribeFormSchema>;

export const TicketEditFormSchema = z.object({
  summary: z.string().min(3).max(160),
  category: z.enum(CATEGORY_ENUM),
  tags: z.array(z.string()),
  area: z.string().min(1),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredWindow: z.enum(WINDOW_ENUM),
  urgency: z.enum(URGENCY_ENUM),
  residentName: z.string().max(50).optional(),
});

export type TicketEditForm = z.infer<typeof TicketEditFormSchema>;
