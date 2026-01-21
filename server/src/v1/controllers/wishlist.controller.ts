import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import UserModel from "../models/User/user.model";

export class WishlistController {
  static async get(req: AuthRequest, res: Response) {
    const user = await UserModel.findById(req.user!.id).populate("wishlist");

    res.json(user?.wishlist || []);
  }

  static async toggle(req: AuthRequest, res: Response) {
    const { productId } = req.params;
    console.log(productId);
    console.log(req.user);
    const user = await UserModel.findById(req.user!.id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    const index = user.wishlist.findIndex((id) => id.toString() === productId);

    if (index >= 0) {
      user.wishlist.splice(index, 1); // ❌ remove
    } else {
      user.wishlist.push(productId as any); // ✅ add
    }

    await user.save();

    res.json({
      inWishlist: index === -1,
    });
  }
}
