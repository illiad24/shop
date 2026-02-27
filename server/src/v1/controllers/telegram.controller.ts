import { Request, Response } from "express";
import OrderModel from "../models/Order/order.model";
import { answerCallback, editMessage } from "../services/telegram.service";

const STATUS_LABEL: Record<string, string> = {
  processing: "🔄 В обробці",
  delivered: "🚚 Доставлено",
  cancelled: "❌ Скасовано",
};

const VALID_STATUSES = ["processing", "delivered", "cancelled"];

export class TelegramController {
  static async webhook(req: Request, res: Response) {
    // Respond to Telegram immediately — required within 5 seconds
    res.sendStatus(200);

    const callback = req.body?.callback_query;
    if (!callback) return;

    const data: string = callback.data ?? "";
    if (!data.startsWith("os:")) return;

    const parts = data.split(":");
    if (parts.length !== 3) return;

    const [, orderId, status] = parts;
    if (!VALID_STATUSES.includes(status)) return;

    try {
      const order = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true },
      );

      if (!order) {
        await answerCallback(callback.id, "Замовлення не знайдено");
        return;
      }

      const label = STATUS_LABEL[status];
      await answerCallback(callback.id, `Статус оновлено: ${label}`);

      // Update message text with new status, keep buttons for further changes
      const originalText = (callback.message?.text ?? "").split("\n\n📌")[0];
      await editMessage(
        callback.message.message_id,
        `${originalText}\n\n📌 <b>Поточний статус: ${label}</b>`,
        orderId,
      );
    } catch (err) {
      console.error("Telegram webhook error:", err);
    }
  }
}
