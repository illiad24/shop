import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";

import { authApi } from "./authApi";
import type { RootState } from "../../../app/store/store";

export interface IAuthState {
  user: null | {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  accessToken: string | null;
  loading: boolean;
  error: null | any;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAuthState>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
    },
    tokenRefreshed(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchPending,
          authApi.endpoints.logout.matchPending,
          authApi.endpoints.refresh.matchPending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.refresh.matchFulfilled,
        ),
        (state, action) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.loading = false;
        },
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchRejected,
          authApi.endpoints.refresh.matchRejected,
          authApi.endpoints.logout.matchRejected,
        ),
        (state, action) => {
          state.user = null;
          state.loading = false;
          state.error = action.error;
        },
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});
export const { login, logout, tokenRefreshed } = authSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export default authSlice.reducer;
