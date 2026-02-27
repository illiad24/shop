import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import OrderModel from "../models/Order/order.model";
import CartModel from "../models/Cart/cart.model";

export class OrderController {
  static async create(req: AuthRequest, res: Response) {
    const {
      firstName,
      lastName,
      companyName,
      street,
      postalCode,
      phone,
      email,
      locationType,
      paczkomat,
      deliveryType,
      paymentType,
      comment,
    } = req.body;

    const deliveryCostMap: Record<string, number> = {
      pickup: 0,
      delivery: 140,
      courier: 180,
    };

    const deliveryCost = deliveryCostMap[deliveryType] ?? 0;

    let items: { productId: string; title: string; price: number; quantity: number }[];

    if (req.user) {
      const cart = await CartModel.findOne({ userId: req.user.id }).populate(
        "items.productId",
      );

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      items = cart.items.map((item) => {
        const product = item.productId as any;
        return {
          productId: product._id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        };
      });

      const productTotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const order = await OrderModel.create({
        userId: req.user.id,
        items,
        deliveryAddress: {
          firstName,
          lastName,
          companyName: companyName ?? "",
          street,
          postalCode,
          phone,
          email,
          locationType: locationType ?? "city",
          paczkomat: paczkomat ?? "",
        },
        deliveryType,
        paymentType,
        comment: comment ?? "",
        deliveryCost,
        productTotal,
        total: productTotal + deliveryCost,
      });

      cart.items = [] as any;
      await cart.save();

      return res.status(201).json(order);
    }

    // Guest order
    const guestItems = req.body.items as { productId: string; title: string; price: number; quantity: number }[];

    if (!guestItems || guestItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const productTotal = guestItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await OrderModel.create({
      userId: null,
      items: guestItems,
      deliveryAddress: {
        firstName,
        lastName,
        companyName: companyName ?? "",
        street,
        postalCode,
        phone,
        email,
        locationType: locationType ?? "city",
        paczkomat: paczkomat ?? "",
      },
      deliveryType,
      paymentType,
      comment: comment ?? "",
      deliveryCost,
      productTotal,
      total: productTotal + deliveryCost,
    });

    return res.status(201).json(order);
  }

  static async getMyOrders(req: AuthRequest, res: Response) {
    const orders = await OrderModel.find({ userId: req.user!.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  }
}
