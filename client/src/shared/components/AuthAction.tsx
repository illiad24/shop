// shared/components/AuthAction.tsx
import { ReactNode } from "react";
import { useAuthGuard } from "../hooks/useAuthGuard";

type Props = {
    children: ReactNode;
    onAction: () => void;
};

export function AuthAction({ children, onAction }: Props) {
    const { withAuth, isAuth } = useAuthGuard();

    function handleClickCapture(e: React.MouseEvent) {
        if (!isAuth) {
            e.stopPropagation();
            e.preventDefault();
            withAuth(onAction);
        }
    }

    return (
        <div onClickCapture={handleClickCapture} onClick={() => { if (isAuth) onAction(); }}>
            {children}
        </div>
    );
}
