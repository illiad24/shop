import express from "express";
import * as Sentry from "@sentry/node";
import v1Router from "./v1/routes/index";
import middleware from "./middlewares";
import connectDB from "./db/connectDB";

export const app = express();

middleware(app);
connectDB();

app.use("/api/v1", v1Router);

// Sentry error handler — must be registered after all routes
Sentry.setupExpressErrorHandler(app);
