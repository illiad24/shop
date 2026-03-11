import express from "express";

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

router.get("/", (req, res) => {
  res.send("Welcome to the API");
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
