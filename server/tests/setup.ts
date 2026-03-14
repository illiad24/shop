// tests/setup.ts
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../src/app";

// Connect to the test database (DATABASE_NAME is suffixed with _test by loadEnv.ts)
beforeAll(async () => {
  const uri = `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`;
  await mongoose.connect(uri);
}, 15_000);

// Drop the test database and disconnect after all tests.
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

export const api = request.agent(app);
