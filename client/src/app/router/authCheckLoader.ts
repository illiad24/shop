import { redirect } from "react-router";
import { authApi } from "../../features/auth/api/authApi";
import { store } from "../store/store";
import { selectAuthUser } from "../../features/auth/api/authSlice";

let refreshTried = false;

export async function authCheckLoader({
  mutex,
  requiredRoles,
}: {
  mutex: any;

  requiredRoles?: any;
}) {
  let state = store.getState();
  let user = selectAuthUser(state);

  // Якщо користувач не авторизований, пробуємо рефреш
  if (!user && !refreshTried) {
    refreshTried = true;
    await mutex.runExclusive(async () => {
      state = store.getState();
      user = selectAuthUser(state);
      if (!user) {
        try {
          const result = await store
            .dispatch(authApi.endpoints.refresh.initiate())
            .unwrap();
          user = result.user;
        } catch {
          user = null;
        }
      }
    });
  }

  state = store.getState();
  user = selectAuthUser(state);
  if (requiredRoles.length > 0) {
    if (!user) {
      refreshTried = false;
      throw redirect("/admin/login");
    }

    const userRole = user.role.toUpperCase() || "";
    if (!requiredRoles.includes(userRole)) {
      throw redirect("/forbidden");
    }
  }

  return { user };
}
