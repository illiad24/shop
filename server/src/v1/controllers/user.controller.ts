import userService from "../services/user.service";
import { Request, Response } from "express";
class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getList({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async me(req: Request, res: Response) {
    try {
      const userId = req.params.userId as string;
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
