import express from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import { AuthRequest } from "../../middlewares/auth";
import UserModel from "../models/User/user.model";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
export default router;
