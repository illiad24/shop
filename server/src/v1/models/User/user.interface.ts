import { Types } from "mongoose";

export interface IAddress {
  _id?: Types.ObjectId;
  city: string;
  street: string;
  recipientName: string;
  apartment?: string | null;
  postalCode?: string | null;
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  wishlist: Types.ObjectId[];
  addresses?: IAddress[];
}
