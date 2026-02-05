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
  }),
});

export const { useGetProductsQuery } = productApi;
