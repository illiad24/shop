import { Router } from "express";
import { WishlistController } from "../controllers/wishlist.controller";
import { authMiddleware as auth } from "../../middlewares/auth";

const router = Router();

router.get("/", auth, WishlistController.get);
router.post("/:productId/toggle", auth, WishlistController.toggle);

export default router;
