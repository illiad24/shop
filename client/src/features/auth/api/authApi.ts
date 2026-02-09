import { baseApi } from "@/shared/api/baseApi";

import { apiRoutes } from "@/shared/config/routes/apiRoutes";
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
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
