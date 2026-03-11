import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import type { Express, Request } from "express";
import config from "../config";

export interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}

const middleware = (app: Express) => {
  app.use(helmet());

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
