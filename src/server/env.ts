import "server-only";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  AI_PROVIDER: z.enum(["google", "anthropic", "openai", "mock"]).default("google"),
  AI_MODEL: z.string().default("gemini-2.5-flash"),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),
  AI_TIMEOUT_MS: z.coerce.number().default(12000),
  DEMO_ADMIN_KEY: z.string().default("change-me"),
  NEXT_PUBLIC_APP_NAME: z.string().default("HelpDesk LK"),
  PILOT_TIMEZONE: z.string().default("Asia/Colombo"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
  AI_PROVIDER: process.env.AI_PROVIDER || "google",
  AI_MODEL: process.env.AI_MODEL || "gemini-2.5-flash",
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  AI_TIMEOUT_MS: process.env.AI_TIMEOUT_MS,
  DEMO_ADMIN_KEY: process.env.DEMO_ADMIN_KEY,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  PILOT_TIMEZONE: process.env.PILOT_TIMEZONE,
});
