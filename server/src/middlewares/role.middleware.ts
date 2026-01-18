import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import { UserRole } from "../types/auth.types";

export const requireRole = (roles: UserRole[]) => {
  console.log(roles);
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(req);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role satisfies UserRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
