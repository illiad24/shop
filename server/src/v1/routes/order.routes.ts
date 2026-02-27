import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware as auth, optionalAuthMiddleware as optionalAuth } from "../../middlewares/auth";

const router = Router();

router.post("/", optionalAuth, OrderController.create);
router.get("/my", auth, OrderController.getMyOrders);

export default router;
