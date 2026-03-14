import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import pinoHttp from "pino-http";
import type { Express, Request } from "express";
import config from "../config";
import { logger } from "../logger";

export interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

export { authLimiter, orderLimiter };

const middleware = (app: Express) => {
  app.use(pinoHttp({ logger }));
  app.use(helmet());
  app.use(mongoSanitize());

  app.use(
    cors({
      origin: config.corsOrigins,
      credentials: true,
    }),
  );

  app.use(
    express.json({
      limit: "10kb",
      verify: (req: RawBodyRequest, _res, buf) => {
        if (req.url?.includes("/stripe/webhook")) {
          req.rawBody = buf;
        }
      },
    }),
  );
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../uploads")));
};

export default middleware;
