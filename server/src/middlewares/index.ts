import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
const middleware = (app: Express) => {
  // Middleware для підтримки CORS (Cross-Origin Resource Sharing)
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://shop-one-sable.vercel.app",
        "https://shop-p3jg0y3ps-ids-projects-df7270c4.vercel.app",
        "https://shop-r9hz.onrender.com",
        // можна залишити для dev
      ], // 👈 твій фронт
      credentials: true, // 👈 дозволяє кукі
    }),
  );

  // Middleware для парсингу JSON запитів
  app.use(express.json());

  // Middleware для парсингу URL-кодованих даних
  app.use(express.urlencoded({ extended: false }));

  // Middleware для парсингу cookies
  app.use(cookieParser());

  // Middleware для обробки статичних файлів з директорії uploads
  app.use(express.static(path.join(__dirname, "../uploads")));
};
export default middleware;
