import { type Server } from "node:http";

import express, { type Express, type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { checkDatabaseHealth, logConfigurationSummary } from "./src/utils/supabase-helpers";
import { pool } from "./src/db";
import { log } from "./src/utils/logger";
import { getPort } from "./src/config/env";

export const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

export default async function runApp(
  setup: (app: Express, server: Server) => Promise<void>,
) {
  try {
    logConfigurationSummary();
    
    const isHealthy = await checkDatabaseHealth(pool);
    if (isHealthy) {
      log("Supabase database connection established", "supabase");
    } else {
      log("WARNING: Database health check failed", "supabase");
    }
  } catch (error) {
    log(`Error initializing Supabase: ${error instanceof Error ? error.message : String(error)}`, "supabase");
  }
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly run the final setup after setting up all the other routes so
  // the catch-all route doesn't interfere with the other routes
  await setup(app, server);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = getPort();
  server.listen(port, "127.0.0.1", () => {
    log(`serving on port ${port}`);
  });
}
