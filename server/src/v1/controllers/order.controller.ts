import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import OrderModel from "../models/Order/order.model";
import CartModel from "../models/Cart/cart.model";
import ProductModel from "../models/Product/product.model";

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

    const cart = await CartModel.findOne({ userId: req.user!.id }).populate(
      "items.productId",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const deliveryCostMap: Record<string, number> = {
      pickup: 0,
      delivery: 140,
      courier: 180,
    };

    const deliveryCost = deliveryCostMap[deliveryType] ?? 0;

    const items = cart.items.map((item) => {
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
      userId: req.user!.id,
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

    res.status(201).json(order);
  }

  static async getMyOrders(req: AuthRequest, res: Response) {
    const orders = await OrderModel.find({ userId: req.user!.id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  }
}
