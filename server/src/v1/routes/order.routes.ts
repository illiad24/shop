import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware as auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth, OrderController.create);
router.get("/my", auth, OrderController.getMyOrders);

export default router;
