// shared/hooks/useAuthGuard.ts
import { useSelector } from "react-redux";
import { useAuthModal } from "../providers/AuthModalProvider";

export function useAuthGuard() {
  const isAuth = useSelector((state: any) => state.auth.accessToken);
  console.log(isAuth);
  const { openLogin } = useAuthModal();

  function withAuth(action: () => void) {
    if (!isAuth) {
      openLogin();
      return;
    }
    action();
  }

  return { withAuth, isAuth };
}
