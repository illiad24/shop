import { Router } from "express";
const router = Router();
import { WishlistController } from "../controllers/wishlist.controller";
import { authMiddleware as auth } from "../../middlewares/auth";
router.get("/", auth, WishlistController.get);

router.post("/:productId/toggle", auth, WishlistController.toggle);
export default router;
