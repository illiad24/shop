import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import UserModel from "../models/User/user.model";

export class AddressController {
  static async getAll(req: AuthRequest, res: Response) {
    const user = await UserModel.findById(req.user!.id).select("addresses");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.addresses);
  }

  static async add(req: AuthRequest, res: Response) {
    const { city, street, apartment, postalCode, recipientName } = req.body;

    const user = await UserModel.findById(req.user!.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push({ city, street, apartment, postalCode, recipientName } as any);
    await user.save();

    res.status(201).json(user.addresses);
  }

  static async remove(req: AuthRequest, res: Response) {
    const { id } = req.params;

    const user = await UserModel.findById(req.user!.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses = user.addresses.filter(
      (addr: any) => addr._id.toString() !== id,
    ) as any;

    await user.save();

    res.json(user.addresses);
  }
}
