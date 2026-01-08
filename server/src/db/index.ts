import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { isProduction } from "../config/env";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Please configure your Supabase connection string.",
  );
}

// Configure pool size based on environment
// In development, use a smaller pool. In production, use larger pool.
// Note: Supabase free tier has limited connections, so keep this reasonable
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  // Recommended settings for Supabase + Express Sessions:
  max: isProduction() ? 20 : 10, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Wait 5s for a connection before failing
  allowExitOnIdle: false,
};


export const pool = new Pool(poolConfig);

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = drizzle(pool, { schema });

