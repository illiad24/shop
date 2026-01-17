// v1/models/refreshToken/refreshToken.model.ts
import { Schema, model, Types } from "mongoose";

const RefreshTokenSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model("RefreshToken", RefreshTokenSchema);
