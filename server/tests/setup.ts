// tests/setup.ts
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  //   await mongoose.connect(process.env.MONGO_TEST_URL!);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

export const api = request.agent(app);
