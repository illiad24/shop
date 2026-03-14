import config from "../config";
import { logger } from "../logger";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export default async function () {
  try {
    await mongoose.connect(config.mongoURI, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });
    logger.info("Успішно підключено до MongoDB");
  } catch (err) {
    logger.error({ err }, "Помилка підключення до MongoDB");
  }
}
