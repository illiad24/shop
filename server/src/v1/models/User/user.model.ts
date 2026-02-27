import { Schema, model } from "mongoose";
import { UserRole } from "../../../types/auth.types";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserRole,
      default: "USER",
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        city: { type: String, required: true },
        street: { type: String, required: true },
        apartment: { type: String },
        postalCode: { type: String },
        recipientName: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const UserModel = model("User", userSchema);
export default UserModel;
