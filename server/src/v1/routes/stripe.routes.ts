import { Router } from "express";
import { StripeController } from "../controllers/stripe.controller";
import { optionalAuthMiddleware as optionalAuth } from "../../middlewares/auth";

const router = Router();

/**
 * POST /api/v1/stripe/webhook
 * Stripe надсилає сюди події після оплати.
 * Raw body зберігається через verify в express.json() middleware.
 */
router.post("/webhook", StripeController.handleWebhook);

/**
 * POST /api/v1/stripe/checkout/:orderId
 */
router.post("/checkout/:orderId", optionalAuth, StripeController.createCheckoutSession);

export default router;
