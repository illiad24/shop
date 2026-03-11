import { Router } from "express";
import { StripeController } from "../controllers/stripe.controller";
import { optionalAuthMiddleware as optionalAuth } from "../../middlewares/auth";

const router = Router();

router.post("/webhook", StripeController.handleWebhook);
router.post("/checkout/:orderId", optionalAuth, StripeController.createCheckoutSession);

export default router;