import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/role.middleware";
import { UserRole } from "../../types/auth.types";
import { rateLimit } from "express-rate-limit";
import { registerValidate, loginValidate } from "../validators/authValidate";
import { validateRequest } from "../../middlewares/validator";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Забагато спроб входу. Спробуйте через 15 хвилин." },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Забагато запитів реєстрації. Спробуйте пізніше." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", registerLimiter, registerValidate, validateRequest, AuthController.register);
router.post("/login", loginLimiter, loginValidate, validateRequest, AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get(
  "/me",
  authMiddleware,
  requireRole([UserRole.USER, UserRole.ADMIN]),
  AuthController.me,
);

export default router;
