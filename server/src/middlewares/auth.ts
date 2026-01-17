import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth.types";
import { jwtConfig } from "../config/jwt.config";

interface JwtPayload {
  id: string;
  role: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      jwtConfig.accessSecret as string
    ) as JwtPayload;

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role as "ADMIN" | "USER",
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
