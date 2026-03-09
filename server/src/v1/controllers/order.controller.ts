import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import OrderModel from "../models/Order/order.model";
import CartModel from "../models/Cart/cart.model";
import { sendOrderNotification } from "../services/telegram.service";

export class OrderController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const {
        firstName, lastName, companyName, street, postalCode,
        phone, email, locationType, paczkomat, deliveryType, paymentType, comment,
      } = req.body;

      const deliveryCostMap: Record<string, number> = { pickup: 0, delivery: 140, courier: 180 };
      const deliveryCost = deliveryCostMap[deliveryType] ?? 0;

      const deliveryAddress = {
        firstName, lastName,
        companyName: companyName ?? "",
        street, postalCode, phone, email,
        locationType: locationType ?? "city",
        paczkomat: paczkomat ?? "",
      };

      if (req.user) {
        const cart = await CartModel.findOne({ userId: req.user.id }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
        }

        const items = cart.items.map((item) => {
          const product = item.productId as any;
          return { productId: product._id, title: product.title, price: product.price, quantity: item.quantity };
        });

        const productTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = await OrderModel.create({
          userId: req.user.id, items, deliveryAddress, deliveryType, paymentType,
          comment: comment ?? "", deliveryCost, productTotal, total: productTotal + deliveryCost,
        });

        cart.items = [] as any;
        await cart.save();
        sendOrderNotification(order).catch(() => {});
        return res.status(201).json(order);
      }

      const guestItems = req.body.items as { productId: string; title: string; price: number; quantity: number }[];
      if (!guestItems || guestItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const productTotal = guestItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const order = await OrderModel.create({
        userId: null, items: guestItems, deliveryAddress, deliveryType, paymentType,
        comment: comment ?? "", deliveryCost, productTotal, total: productTotal + deliveryCost,
      });

      sendOrderNotification(order).catch(() => {});
      return res.status(201).json(order);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMyOrders(req: AuthRequest, res: Response) {
    try {
      const orders = await OrderModel.find({ userId: req.user!.id }).sort({ createdAt: -1 });
      res.json(orders);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ["pending", "processing", "delivered", "cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
