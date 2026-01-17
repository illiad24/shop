import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.post("/me", authMiddleware, AuthController.me);

export default router;
