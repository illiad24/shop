import { baseApi } from "../../shared/api/baseApi";
import { apiRoutes } from "../../shared/config/routes/apiRoutes";
import type { ProductType } from "../../features/productItem/ProductType";

export interface CartItem {
  _id: string;
  productId: ProductType;
  quantity: number;
}

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<CartItem[], void>({
      query: () => ({
        url: apiRoutes.cart.get,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: build.mutation<CartItem[], string>({
      query: (productId) => ({
        url: apiRoutes.cart.add(productId),
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: build.mutation<
      CartItem[],
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: apiRoutes.cart.update(productId),
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: build.mutation<CartItem[], string>({
      query: (productId) => ({
        url: apiRoutes.cart.remove(productId),
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: build.mutation<CartItem[], void>({
      query: () => ({
        url: apiRoutes.cart.clear,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
