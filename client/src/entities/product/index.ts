import { baseApi } from "../../shared/api/baseApi";
import { apiRoutes } from "../../shared/config/routes/apiRoutes";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: apiRoutes.products.list,
      }),
      providesTags: ["Product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: apiRoutes.products.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useDeleteProductMutation } = productApi;
