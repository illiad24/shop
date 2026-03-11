import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import { RawBodyRequest } from "../../middlewares";
import OrderModel from "../models/Order/order.model";
import CartModel from "../models/Cart/cart.model";
import { createCheckoutSession, constructWebhookEvent } from "../services/stripe.service";
import { sendOrderNotification } from "../services/telegram.service";

export class StripeController {
  static async createCheckoutSession(req: AuthRequest, res: Response) {
    try {
      const { orderId } = req.params;

      const order = await OrderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (!order.deliveryAddress) {
        return res.status(400).json({ message: "Order has no delivery address" });
      }

      if (order.userId && req.user && order.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const session = await createCheckoutSession({
        _id: order._id.toString(),
        items: order.items.map((item) => ({
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        deliveryCost: order.deliveryCost,
        deliveryAddress: { email: order.deliveryAddress.email },
      });

      order.stripeSessionId = session.id;
      await order.save();

      return res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      return res.status(500).json({ message: "Failed to create checkout session" });
    }
  }

  static async handleWebhook(req: RawBodyRequest, res: Response) {
    const signature = req.headers["stripe-signature"] as string;

    console.log("[Stripe webhook] received event");

    if (!signature) {
      console.error("[Stripe webhook] missing stripe-signature header");
      return res.status(400).json({ message: "Missing stripe-signature header" });
    }

    if (!req.rawBody) {
      console.error("[Stripe webhook] rawBody is missing");
      return res.status(400).json({ message: "Raw body not available" });
    }

    let event;
    try {
      event = constructWebhookEvent(req.rawBody, signature);
    } catch (error: any) {
      console.error("[Stripe webhook] signature verification failed:", error.message);
      return res.status(400).json({ message: `Webhook Error: ${error.message}` });
    }

    console.log("[Stripe webhook] event type:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      console.log("[Stripe webhook] session id:", session.id);

      try {
        const order = await OrderModel.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            paymentStatus: "paid",
            status: "processing",
          },
          { new: true },
        );

        if (!order) {
          console.error("[Stripe webhook] order not found for session:", session.id);
        } else {
          console.log("[Stripe webhook] order updated, sending Telegram notification...");
          await sendOrderNotification(order).catch((err) => {
            console.error("[Stripe webhook] Telegram notification failed:", err);
          });
          console.log("[Stripe webhook] Telegram notification sent");

          if (order.userId) {
            await CartModel.findOneAndUpdate(
              { userId: order.userId },
              { $set: { items: [] } },
            ).catch(() => {});
          }
        }
      } catch (error) {
        console.error("[Stripe webhook] failed to update order:", error);
        return res.status(200).json({ received: true });
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as any;
      await OrderModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        { paymentStatus: "failed" },
      ).catch(() => {});
    }

    return res.status(200).json({ received: true });
  }
}
