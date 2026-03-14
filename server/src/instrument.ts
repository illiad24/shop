import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV ?? "development",
  enabled: !!process.env.SENTRY_DSN,

  // Capture 100% of errors, 10% of transactions (performance)
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
});
