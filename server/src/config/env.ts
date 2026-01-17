import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing env variable: ${key}`);
  }
  return value;
}

export default Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: required("JWT_ACCESS_SECRET"),
  databaseName: required("DATABASE_NAME"),
  mongoURI: `${required("MONGODB_URL")}/${required("DATABASE_NAME")}`,
});
