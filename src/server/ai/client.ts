import "server-only";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "../env";

export function getAiModel() {
  if (env.AI_PROVIDER === "mock") {
    return "mock";
  }

  const apiKey = env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const google = createGoogleGenerativeAI({
    apiKey,
  });

  return google(env.AI_MODEL || "gemini-2.5-flash");
}
