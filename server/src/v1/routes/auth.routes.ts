import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/role.middleware";
import { UserRole } from "../../types/auth.types";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get(
  "/me",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  AuthController.me,
);

export default router;
