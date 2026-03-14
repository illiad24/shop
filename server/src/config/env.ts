import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URL: z.string().min(1, "MONGODB_URL is required"),
  DATABASE_NAME: z.string().min(1, "DATABASE_NAME is required"),
  JWT_ACCESS_SECRET: z.string().min(16, "JWT_ACCESS_SECRET must be at least 16 chars"),
  STRIPE_SECRET_KEY: z.string().regex(/^sk_/, "STRIPE_SECRET_KEY must start with sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().regex(/^whsec_/, "STRIPE_WEBHOOK_SECRET must start with whsec_"),
  CORS_ORIGINS: z.string().optional(),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  SENTRY_DSN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  ❌ ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`\n🚨 Invalid environment variables:\n${issues}\n`);
}

const env = parsed.data;

const devOrigins = ["http://localhost:5173"];
const corsOrigins = env.CORS_ORIGINS
  ? env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : devOrigins;

export default Object.freeze({
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  jwtSecret: env.JWT_ACCESS_SECRET,
  databaseName: env.DATABASE_NAME,
  mongoURI: `${env.MONGODB_URL}/${env.DATABASE_NAME}`,
  corsOrigins,
  stripeSecretKey: env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
  clientUrl: env.CLIENT_URL,
  sentryDsn: env.SENTRY_DSN,
});
