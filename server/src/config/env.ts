import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing env variable: ${key}`);
  }
  return value;
}

const devOrigins = ["http://localhost:5173"];

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : devOrigins;

export default Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: required("JWT_ACCESS_SECRET"),
  databaseName: required("DATABASE_NAME"),
  mongoURI: `${required("MONGODB_URL")}/${required("DATABASE_NAME")}`,
  corsOrigins,
  stripeSecretKey: required("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: required("STRIPE_WEBHOOK_SECRET"),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
});
