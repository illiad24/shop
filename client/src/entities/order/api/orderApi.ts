import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";

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
    getMyOrders: build.query<any[], void>({
      query: () => apiRoutes.orders.myOrders,
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi;
