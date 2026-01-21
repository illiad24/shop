// product.model.ts
import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["CHILLED", "FROZEN", "READY", "MARINATED", "SNACKS"],
    required: true,
    index: true,
  },
  price: { type: Number, required: true, min: 0 },
  portionWeightGrams: { type: Number, required: true, min: 1 },
  countPerPortion: String,
  stockPortions: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true },
});

const ProductModel = model<IProduct>("Product", ProductSchema);
export default ProductModel;
