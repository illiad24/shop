import express from "express";
import mongoose from "mongoose";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import wishlistRoutes from "./wishlist.routes";
import cartRoutes from "./cart.routes";
import addressRoutes from "./address.routes";
import orderRoutes from "./order.routes";
import telegramRoutes from "./telegram.routes";
import stripeRoutes from "./stripe.routes";
import { authLimiter, orderLimiter } from "../../middlewares";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Welcome to the API");
});

router.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected";
  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    db: dbStatus,
  });
});

router.use("/auth", authLimiter, authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/addresses", addressRoutes);
router.use("/orders", orderLimiter, orderRoutes);
router.use("/telegram", telegramRoutes);
router.use("/stripe", stripeRoutes);

export default router;
