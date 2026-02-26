import { baseApi } from "@/shared/api/baseApi";
import { apiRoutes } from "@/shared/config/routes/apiRoutes";
import type { Address } from "@/entities/address/api/addressApi";

export interface IMe {
  _id: string;
  email: string;
  name: string;
  wishlist: string[];
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: apiRoutes.auth.register,
        method: "POST",
        body: credentials,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: apiRoutes.auth.logout,
        method: "POST",
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: apiRoutes.auth.refresh,
        method: "POST",
      }),
    }),
    updateMe: build.mutation<
      { id: string; name: string; email: string; role: string },
      { name: string; email: string }
    >({
      query: (data) => ({
        url: apiRoutes.user.me,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    me: build.query<IMe, void>({
      query: () => apiRoutes.user.me,
      providesTags: ["User"],
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useUpdateMeMutation,
  useMeQuery,
} = authApi;
