import express from "express";
import v1Router from "./v1/routes/index";
import middleware from "./middlewares";
import connectDB from "./db/connectDB";
export const app = express();

middleware(app);
connectDB();

app.use("/api/v1", v1Router);
