import config from "../config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export default async function () {
  try {
    await mongoose.connect(config.mongoURI, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });
    console.log("Успішно підключено до MongoDB");
  } catch (err) {
    console.error("Помилка підключення до MongoDB:", err);
  }
}
