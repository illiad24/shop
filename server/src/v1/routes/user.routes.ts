import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/list", UserController.getAllUsers);
router.get("/me/:userId", UserController.me);

export default router;
