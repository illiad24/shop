import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/role.middleware";
import { UserRole } from "../../types/auth.types";

const router = Router();

router.get(
  "/list",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  UserController.getAllUsers,
);
router.get(
  "/me/:userId",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  UserController.me,
);

export default router;
