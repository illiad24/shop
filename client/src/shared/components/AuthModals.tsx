// shared/components/AuthModals.tsx
import { LoginModal } from "@/features/auth/login/ui/LoginModal";
import { useAuthModal } from "../providers/AuthModalProvider";
import { RegisterModal } from "@/features/auth/register/ui/RegisterModal";

export function AuthModals() {
    const { modal, close, openLogin, openRegister } = useAuthModal();
    function openLoginModal() {
        openRegister()
    }
    function openRegisterModal() {
        openLogin()
    }
    return (
        <>
            <LoginModal open={modal === "login"} onOpenChange={close} onRegisterClick={openLoginModal} />
            <RegisterModal open={modal === "register"} onOpenChange={close} onLoginClick={openRegisterModal} />
        </>
    );
}
