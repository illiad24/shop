// shared/components/AuthModals.tsx
import { LoginModal } from "@/features/auth/login/ui/LoginModal";
import { useAuthModal } from "../providers/AuthModalProvider";
import { RegisterModal } from "@/features/auth/register/ui/RegisterModal";
import { useState } from "react";

export function AuthModals() {
    const { modal, close, openLogin, openRegister } = useAuthModal();
    const [registerModalOpen, setRegisterModalOpen] = useState(false)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    function openLoginModal() {
        openRegister()

    }
    function openRegisterModal() {
        openLogin()

    }
    return (
        <>
            <LoginModal open={modal === "login" || registerModalOpen} onOpenChange={close} onRegisterClick={openLoginModal} />
            <RegisterModal open={modal === "register" || loginModalOpen} onOpenChange={close} onLoginClick={openRegisterModal} />
        </>
    );
}
