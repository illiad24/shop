import { Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  wishlist: Types.ObjectId[];
}
