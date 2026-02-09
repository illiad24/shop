import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest } from "../../middlewares/auth";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (e: any) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { user, accessToken, refreshToken } = await AuthService.login(
        req.body,
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        user,
        accessToken,
      });
    } catch (e: any) {
      res.status(401).json({
        success: false,
        message: e.message,
      });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
      }

      const tokens = await AuthService.refresh(refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        accessToken: tokens.accessToken,
      });
    } catch (e: any) {
      res.status(403).json({
        success: false,
        messages: e.message,
      });
    }
  }

  static async logout(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }

    res.clearCookie("refreshToken");
    res.sendStatus(204);
  }
  static async me(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.me(req.user!.id);
      res.json(user);
    } catch (e: any) {
      res.status(401).json({ message: e.message });
    }
  }
}
