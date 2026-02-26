import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    deliveryAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      companyName: { type: String, default: "" },
      street: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      locationType: { type: String, enum: ["village", "city"], default: "city" },
      paczkomat: { type: String, default: "" },
    },
    deliveryType: {
      type: String,
      enum: ["pickup", "delivery", "courier"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["card", "online", "monobank"],
      required: true,
    },
    comment: { type: String, default: "" },
    deliveryCost: { type: Number, required: true },
    productTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const OrderModel = model("Order", orderSchema);
export default OrderModel;
