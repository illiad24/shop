import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import UserModel from "../models/User/user.model";

export class WishlistController {
  static async get(req: AuthRequest, res: Response) {
    try {
      const user = await UserModel.findById(req.user!.id).populate("wishlist");
      res.json(user?.wishlist || []);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async toggle(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;
      const user = await UserModel.findById(req.user!.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const index = user.wishlist.findIndex((id) => id.toString() === productId);
      if (index >= 0) {
        user.wishlist.splice(index, 1);
      } else {
        user.wishlist.push(productId as any);
      }

      await user.save();
      res.json({ inWishlist: index === -1 });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
