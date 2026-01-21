import express from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import wishlistRoutes from "./wishlist.routes";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
export default router;
