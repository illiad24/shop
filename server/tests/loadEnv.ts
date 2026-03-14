import dotenv from "dotenv";

// Load .env, then override DATABASE_NAME to use an isolated test database.
// This avoids duplicating secrets and prevents afterAll dropDatabase()
// from wiping development data.
dotenv.config();
process.env.DATABASE_NAME = (process.env.DATABASE_NAME ?? "shop") + "_test";
process.env.NODE_ENV = "test";
