import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

// For Supabase connection pooler on port 6543 (transaction mode), `prepare: false` is required.
let connectionString = env.DATABASE_URL;

// If placeholder brackets exist from .env.example, fallback to safe URL during build phase
if (connectionString.includes("[YOUR-PASSWORD]") || connectionString.includes("[REGION]")) {
  connectionString = "postgres://postgres:postgres@127.0.0.1:5432/postgres";
}

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn =
  globalForDb.conn ??
  postgres(connectionString, {
    prepare: false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    onnotice: () => {}, // silence notices
  });

if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
