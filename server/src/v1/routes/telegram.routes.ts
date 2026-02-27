import { Router } from "express";
import { TelegramController } from "../controllers/telegram.controller";

const router = Router();

router.post("/webhook", TelegramController.webhook);

export default router;
