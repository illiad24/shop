import { baseApi } from "@/shared/api/baseApi";

export interface Address {
  _id: string;
  city: string;
  street: string;
  apartment?: string;
  postalCode?: string;
  recipientName: string;
}

export interface AddressInput {
  city: string;
  street: string;
  apartment?: string;
  postalCode?: string;
  recipientName: string;
}

export const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAddresses: build.query<Address[], void>({
      query: () => "/addresses",
      providesTags: ["Address"],
    }),
    addAddress: build.mutation<Address[], AddressInput>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    removeAddress: build.mutation<Address[], string>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useRemoveAddressMutation,
} = addressApi;
