const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function apiCall(method: string, body: object): Promise<any> {
  if (!BOT_TOKEN) return;
  const res = await fetch(`${BASE_URL}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

function deliveryLabel(type: string) {
  const map: Record<string, string> = {
    pickup: "Самовивіз",
    delivery: "Пошта",
    courier: "Кур'єр",
  };
  return map[type] ?? type;
}

function paymentLabel(type: string) {
  const map: Record<string, string> = {
    card: "Картка",
    online: "Онлайн",
    monobank: "Monobank",
  };
  return map[type] ?? type;
}

export async function sendOrderNotification(order: any): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) return;

  const addr = order.deliveryAddress;
  const shortId = order._id.toString().slice(-6).toUpperCase();

  const itemLines = order.items
    .map((i: any) => `  • ${i.title} x${i.quantity} — ${i.price * i.quantity} грн`)
    .join("\n");

  const lines = [
    `🛒 <b>Нове замовлення #${shortId}</b>`,
    ``,
    `👤 ${addr.firstName} ${addr.lastName}`,
    `📞 ${addr.phone}`,
    `📧 ${addr.email}`,
    ``,
    `📦 <b>Товари:</b>`,
    itemLines,
    ``,
    `🚚 ${deliveryLabel(order.deliveryType)} — ${order.deliveryCost} грн`,
    `💳 ${paymentLabel(order.paymentType)}`,
    `📍 ${addr.street}, ${addr.postalCode}`,
    order.comment ? `💬 ${order.comment}` : null,
    ``,
    `💰 <b>Разом: ${order.total} грн</b>`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  await apiCall("sendMessage", {
    chat_id: CHAT_ID,
    text: lines,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔄 В обробці", callback_data: `os:${order._id}:processing` },
          { text: "🚚 Доставлено", callback_data: `os:${order._id}:delivered` },
        ],
        [{ text: "❌ Скасувати", callback_data: `os:${order._id}:cancelled` }],
      ],
    },
  });
}

export async function answerCallback(id: string, text: string): Promise<void> {
  await apiCall("answerCallbackQuery", { callback_query_id: id, text });
}

export async function editMessage(
  messageId: number,
  text: string,
  orderId: string,
): Promise<void> {
  if (!CHAT_ID) return;
  await apiCall("editMessageText", {
    chat_id: CHAT_ID,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔄 В обробці", callback_data: `os:${orderId}:processing` },
          { text: "🚚 Доставлено", callback_data: `os:${orderId}:delivered` },
        ],
        [{ text: "❌ Скасувати", callback_data: `os:${orderId}:cancelled` }],
      ],
    },
  });
}

export async function setupWebhook(appUrl: string): Promise<void> {
  const result = await apiCall("setWebhook", {
    url: `${appUrl}/api/v1/telegram/webhook`,
  });
  console.log("Telegram webhook:", result);
}
