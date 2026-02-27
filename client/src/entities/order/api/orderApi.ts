import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";

export interface GuestOrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CreateOrderBody {
  firstName: string;
  lastName: string;
  companyName?: string;
  street: string;
  postalCode: string;
  phone: string;
  email: string;
  locationType: "village" | "city";
  paczkomat?: string;
  deliveryType: "pickup" | "delivery" | "courier";
  paymentType: "card" | "online" | "monobank";
  comment?: string;
  items?: GuestOrderItem[];
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  deliveryAddress: {
    firstName: string;
    lastName: string;
    street: string;
    postalCode: string;
    phone: string;
    email: string;
  };
  deliveryType: "pickup" | "delivery" | "courier";
  paymentType: "card" | "online" | "monobank";
  comment: string;
  deliveryCost: number;
  productTotal: number;
  total: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<void, CreateOrderBody>({
      query: (body) => ({
        url: apiRoutes.orders.create,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "Order"],
    }),
    getMyOrders: build.query<Order[], void>({
      query: () => apiRoutes.orders.myOrders,
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi;
