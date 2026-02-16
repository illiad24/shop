// shared/providers/AuthModalProvider.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "login" | "register" | null;

type ContextType = {
    modal: ModalType;
    openLogin: () => void;
    openRegister: () => void;
    close: () => void;
};

const AuthModalContext = createContext < ContextType | null > (null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [modal, setModal] = useState < ModalType > (null);

    const openLogin = () => setModal("login");
    const openRegister = () => setModal("register");
    const close = () => setModal(null);

    return (
        <AuthModalContext.Provider value={{ modal, openLogin, openRegister, close }}>
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const ctx = useContext(AuthModalContext);
    if (!ctx) {
        throw new Error("useAuthModal must be used inside AuthModalProvider");
    }
    return ctx;
}
