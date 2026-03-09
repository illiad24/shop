import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import type { Express } from "express";
import config from "../config";

const middleware = (app: Express) => {
  app.use(helmet());

  app.use(
    cors({
      origin: config.corsOrigins,
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../uploads")));
};

export default middleware;
