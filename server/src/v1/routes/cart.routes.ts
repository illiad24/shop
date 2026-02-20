import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware as auth } from "../../middlewares/auth";

const router = Router();

router.get("/", auth, CartController.get);
router.post("/:productId", auth, CartController.add);
router.patch("/:productId", auth, CartController.updateQuantity);
router.delete("/clear", auth, CartController.clear);
router.delete("/:productId", auth, CartController.remove);

export default router;
