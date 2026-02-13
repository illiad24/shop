import { baseApi } from "../../shared/api/baseApi";
import { apiRoutes } from "../../shared/config/routes/apiRoutes";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (filterData) => ({
        url: apiRoutes.products.list,
        method: "GET",
        params: filterData,
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
    addProduct: build.mutation({
      query: (data) => ({
        url: apiRoutes.products.create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getProduct: build.query({
      query: (id: string) => ({
        url: apiRoutes.products.getById(id),
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: apiRoutes.products.update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} = productApi;
