import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.stripeSecretKey);

interface OrderItem {
  title: string;
  price: number;
  quantity: number;
}

interface StripeOrderData {
  _id: string;
  items: OrderItem[];
  deliveryCost: number;
  deliveryAddress: { email: string };
}


export async function createCheckoutSession(order: StripeOrderData) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((item) => ({
    price_data: {
      currency: "uah",
      product_data: {
        name: item.title,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  if (order.deliveryCost > 0) {
    lineItems.push({
      price_data: {
        currency: "uah",
        product_data: {
          name: "Доставка",
        },
        unit_amount: Math.round(order.deliveryCost * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: order.deliveryAddress.email,
    line_items: lineItems,
    metadata: {
      orderId: order._id.toString(),
    },
    success_url: `${config.clientUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.clientUrl}/order/cancel`,
  });

  return session;
}

export function constructWebhookEvent(rawBody: Buffer, signature: string) {
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    config.stripeWebhookSecret,
  );
}
