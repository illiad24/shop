import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware as auth, optionalAuthMiddleware as optionalAuth } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/role.middleware";
import { UserRole } from "../../types/auth.types";
import { createOrderValidate } from "../validators/orderValidate";
import { validateRequest } from "../../middlewares/validator";

const router = Router();

router.post("/", optionalAuth, createOrderValidate, validateRequest, OrderController.create);
router.get("/", auth, requireRole([UserRole.ADMIN]), OrderController.getAll);
router.get("/my", auth, OrderController.getMyOrders);
router.patch("/:id/status", auth, requireRole([UserRole.ADMIN]), OrderController.updateStatus);

export default router;
