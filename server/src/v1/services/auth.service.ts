import User from "../models/User/user.model";
import bcrypt from "bcrypt";
import { RegisterDTO, LoginDTO } from "../dtos/auth.dto";
import RefreshToken from "../models/refreshToken/refreshToken.model";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export class AuthService {
  // ---------------- REGISTER ----------------
  static async register(data: RegisterDTO) {
    try {
      const exists = await User.findOne({ email: data.email });
      if (exists) throw new Error("User already exists");
    } catch (error) {
      console.log(error);
    }

    const password = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      email: data.email,
      name: data.name,
      password,
    });

    return user;
  }

  // ---------------- LOGIN ----------------
  static async login(data: LoginDTO) {
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user._id.toString(),
    });

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  // ---------------- REFRESH ----------------
  static async refresh(oldRefreshToken: string) {
    const stored = await RefreshToken.findOne({ token: oldRefreshToken });
    if (!stored) throw new Error("Invalid refresh token");

    const payload = verifyRefreshToken(oldRefreshToken);

    const user = await User.findById(payload.id);
    if (!user) throw new Error("User not found");

    // rotation
    await RefreshToken.deleteOne({ token: oldRefreshToken });

    const newAccessToken = generateAccessToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({
      id: user._id.toString(),
    });

    await RefreshToken.create({
      userId: user._id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  // ---------------- LOGOUT ----------------
  static async logout(refreshToken: string) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  //   ---------- Me ------------
  static async me(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  }
}
