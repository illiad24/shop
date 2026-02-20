import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import CartModel from "../models/Cart/cart.model";

export class CartController {
  static async get(req: AuthRequest, res: Response) {
    let cart = await CartModel.findOne({ userId: req.user!.id }).populate(
      "items.productId",
    );

    if (!cart) {
      cart = await CartModel.create({ userId: req.user!.id, items: [] });
    }

    res.json(cart.items);
  }

  static async add(req: AuthRequest, res: Response) {
    const { productId } = req.params;

    let cart = await CartModel.findOne({ userId: req.user!.id });

    if (!cart) {
      cart = await CartModel.create({ userId: req.user!.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId: productId as any, quantity: 1 });
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart.items);
  }

  static async updateQuantity(req: AuthRequest, res: Response) {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await CartModel.findOne({ userId: req.user!.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId,
      ) as any;
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart.items);
  }

  static async remove(req: AuthRequest, res: Response) {
    const { productId } = req.params;

    const cart = await CartModel.findOne({ userId: req.user!.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    ) as any;

    await cart.save();
    await cart.populate("items.productId");

    res.json(cart.items);
  }

  static async clear(req: AuthRequest, res: Response) {
    const cart = await CartModel.findOne({ userId: req.user!.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [] as any;
    await cart.save();

    res.json([]);
  }
}
