import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/role.middleware";
import { UserRole } from "../../types/auth.types";
import { updateMeValidate } from "../validators/userValidate";
import { validateRequest } from "../../middlewares/validator";

const router = Router();

router.patch(
  "/me",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  updateMeValidate,
  validateRequest,
  UserController.updateMe,
);
router.get(
  "/list",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  UserController.getAllUsers,
);
router.get(
  "/me",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  UserController.me,
);

export default router;
