import type { ProductType } from "@/features/productItem/ProductType";
import { baseApi } from "@/shared/api/baseApi";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query<ProductType[], void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    toggleWishlist: build.mutation<{ inWishlist: boolean }, string>({
      query: (productId) => ({
        url: `/wishlist/${productId}/toggle`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistApi;
