import { Schema, model } from "mongoose";

const failedNotificationSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    orderData: { type: Schema.Types.Mixed, required: true },
    error: { type: String, required: true },
    retryCount: { type: Number, default: 0 },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const FailedNotificationModel = model("FailedNotification", failedNotificationSchema);
export default FailedNotificationModel;
