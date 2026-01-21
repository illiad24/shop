import userService from "../services/user.service";
import { Request, Response } from "express";
class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getList();
      console.log(users);
      res.json(users);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  static async me(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      if (typeof userId !== "string") {
        throw new Error("Invalid userId");
      }
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}

export default UserController;
