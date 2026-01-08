/**
 * Supabase Configuration Helper
 * Provides utilities for Supabase connection and project setup
 */

import { getSupabaseConfig, getDatabaseUrl } from "../config/env";

interface SupabaseConfig {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  databaseUrl: string;
}

/**
 * Get Supabase configuration from environment variables
 */
export function getSupabaseConfigFull(): SupabaseConfig {
  const config = getSupabaseConfig();
  const projectId = config.projectId;

  return {
    projectUrl: projectId 
      ? `https://${projectId}.supabase.co`
      : "https://your-project.supabase.co",
    anonKey: config.anonKey || "",
    serviceRoleKey: config.serviceRoleKey || "",
    databaseUrl: config.databaseUrl,
  };
}

/**
 * Validate Supabase connection configuration
 */
export async function validateSupabaseConnection(): Promise<{
  valid: boolean;
  message: string;
  details?: {
    host?: string;
    database?: string;
    user?: string;
  };
}> {
  try {
    const databaseUrl = getDatabaseUrl();

    // Parse connection string
    const url = new URL(databaseUrl.replace("postgresql://", "postgres://"));
    
    return {
      valid: true,
      message: "Supabase configuration is valid",
      details: {
        host: url.hostname,
        database: url.pathname?.slice(1) || "postgres",
        user: url.username || "postgres",
      },
    };
  } catch (error) {
    return {
      valid: false,
      message: `Invalid Supabase configuration: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Connection pool options for different environments
 */
export function getPoolOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    max: isProduction ? 20 : 5, // Connection pool size
    idleTimeoutMillis: isProduction ? 30000 : 10000,
    connectionTimeoutMillis: isProduction ? 5000 : 2000,
  };
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(pool: any): Promise<boolean> {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    console.log("Database health check passed");
    
    return !!result.rows[0];
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}

/**
 * Supabase project information helper
 */
export function parseProjectFromUrl(databaseUrl: string) {
  try {
    const match = databaseUrl.match(/db\.([a-z0-9]+)\.supabase\.co/);
    if (match) {
      return match[1]; // Project ID
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Log configuration summary (without sensitive data)
 */
export function logConfigurationSummary() {
  try {
    const { databaseUrl, projectUrl } = getSupabaseConfigFull();
    const projectId = parseProjectFromUrl(databaseUrl);

    console.log(
      "\n" +
        "================================\n" +
        "Supabase Configuration Summary\n" +
        "================================\n" +
        `Project URL: ${projectUrl}\n` +
        `Project ID: ${projectId || "unknown"}\n` +
        `Database: Connected to Supabase PostgreSQL\n` +
        `Environment: ${process.env.NODE_ENV || "development"}\n` +
        "================================\n"
    );
  } catch (error) {
    console.log("Could not load Supabase configuration");
  }
}

/**
 * Get Supabase dashboard URL for the project
 */
export function getSupabaseDashboardUrl(): string {
  const config = getSupabaseConfig();
  const projectId = config.projectId;
  if (!projectId) {
    return "https://supabase.com/dashboard";
  }
  return `https://supabase.com/dashboard/project/${projectId}`;
}

/**
 * Useful connection string builders for reference
 */
export const connectionStringExamples = {
  standard: "postgresql://postgres:password@db.PROJECT_ID.supabase.co:5432/postgres",
  withSchema:
    "postgresql://postgres:password@db.PROJECT_ID.supabase.co:5432/postgres?schema=public",
  withSSL:
    "postgresql://postgres:password@db.PROJECT_ID.supabase.co:5432/postgres?sslmode=require",
  pooling:
    "postgresql://postgres:password@db.PROJECT_ID-pooler.supabase.co:5432/postgres?schema=public&sslmode=require",
};

