import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "@/features/auth/api/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401 && extraOptions) {
    // Access token закінчився, пробуємо оновити
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // Оновлюємо токен у state
      api.dispatch(setCredentials(refreshResult.data));
      // Повторюємо оригінальний запит з новим токеном
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Оновлення токена не вдалось — логаут
      api.dispatch(logout());
      window.location.href = "/login"; // Перенаправлення
    }
  }
  return result;
};
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
