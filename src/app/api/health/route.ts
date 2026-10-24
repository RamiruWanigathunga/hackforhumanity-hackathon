import { NextResponse } from "next/server";
import { db } from "@/server/db/client";
import { sql } from "drizzle-orm";
import { env } from "@/server/env";

export async function GET() {
  let dbOk = false;
  try {
    const res = await db.execute(sql`SELECT 1 as alive`);
    dbOk = Array.isArray(res) || Boolean(res);
  } catch (err) {
    console.warn("Healthcheck DB ping failed:", err);
    dbOk = false;
  }

  const aiStatus = env.GOOGLE_GENERATIVE_AI_API_KEY ? "configured" : "missing";

  return NextResponse.json({
    ok: true,
    db: dbOk,
    ai: aiStatus,
    timestamp: new Date().toISOString(),
  });
}
