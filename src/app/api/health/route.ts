import { NextResponse, connection } from "next/server";
import { env } from "@/server/env";

export async function GET() {
  await connection();

  const aiStatus = env.GOOGLE_GENERATIVE_AI_API_KEY ? "configured" : "missing";

  return NextResponse.json({
    ok: true,
    store: "ready",
    ai: aiStatus,
    timestamp: new Date().toISOString(),
  });
}
