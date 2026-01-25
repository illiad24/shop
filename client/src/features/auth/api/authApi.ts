import { baseApi } from "@/shared/api/baseApi";

import { apiRoutes } from "@/shared/config/routes/apiRoutes";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: apiRoutes.auth.login,
        method: "POST",
        body: credentials,
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
export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApi;
