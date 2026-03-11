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
  paymentType: "cash" | "online";
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
  paymentType: "cash" | "online";
  comment: string;
  deliveryCost: number;
  productTotal: number;
  total: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "failed";
  createdAt: string;
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order, CreateOrderBody>({
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
    getAllOrders: build.query<Order[], void>({
      query: () => apiRoutes.orders.all,
      providesTags: ["Order"],
    }),
    initiateCheckout: build.mutation<{ url: string }, string>({
      query: (orderId) => ({
        url: apiRoutes.stripe.checkout(orderId),
        method: "POST",
      }),
    }),
    updateOrderStatus: build.mutation<Order, { orderId: string; status: string }>({
      query: ({ orderId, status }) => ({
        url: apiRoutes.orders.updateStatus(orderId),
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useInitiateCheckoutMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
