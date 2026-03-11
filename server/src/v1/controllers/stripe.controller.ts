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

    if (!signature) {
      return res.status(400).json({ message: "Missing stripe-signature header" });
    }

    if (!req.rawBody) {
      return res.status(400).json({ message: "Raw body not available" });
    }

    let event;
    try {
      event = constructWebhookEvent(req.rawBody, signature);
    } catch (error: any) {
      return res.status(400).json({ message: `Webhook Error: ${error.message}` });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      try {
        const order = await OrderModel.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            paymentStatus: "paid",
            status: "processing",
          },
          { new: true },
        );

        if (order) {
          await sendOrderNotification(order).catch(() => {});

          if (order.userId) {
            await CartModel.findOneAndUpdate(
              { userId: order.userId },
              { $set: { items: [] } },
            ).catch(() => {});
          }
        }
      } catch {
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
