import userService from "../services/user.service";
import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth";
import UserModel from "../models/User/user.model";

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getList({});
      res.json(users);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateMe(req: AuthRequest, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await UserModel.findByIdAndUpdate(
        req.user!.id,
        { name, email },
        { new: true },
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async me(req: AuthRequest, res: Response) {
    try {
      const user = await userService.getUserById(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
