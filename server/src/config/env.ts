/**
 * Environment Configuration
 * Centralizes all environment variable access and validation
 */

export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL must be set. Please configure your Supabase connection string.",
    );
  }
  return url;
}

export function getSessionSecret(): string {
  return process.env.SESSION_SECRET || "assetzaudit-dev-secret-change-in-production";
}

export function getAppUrl(): string {
  // Check for Replit production domain first
  if (process.env.REPLIT_INTERNAL_APP_DOMAIN) {
    return `https://${process.env.REPLIT_INTERNAL_APP_DOMAIN}`;
  }
  
  // Check for Replit dev domain
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  
  // Fall back to APP_URL or localhost
  return process.env.APP_URL || "http://localhost:5001";
}

export function getSendgridApiKey(): string | undefined {
  return process.env.SENDGRID_API_KEY;
}

export function getFromEmail(): string {
  return process.env.FROM_EMAIL || "noreply@assetzaudit.com";
}

export function getTwilioConfig(): {
  accountSid: string | undefined;
  authToken: string | undefined;
  phoneNumber: string | undefined;
} {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  };
}

export function getSupabaseConfig(): {
  projectId: string | undefined;
  anonKey: string | undefined;
  serviceRoleKey: string | undefined;
  databaseUrl: string;
} {
  return {
    projectId: process.env.SUPABASE_PROJECT_ID,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    databaseUrl: getDatabaseUrl(),
  };
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getPort(): number {
  return parseInt(process.env.PORT || '5000', 10);
}

