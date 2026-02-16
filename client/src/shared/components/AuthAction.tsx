// shared/components/AuthAction.tsx
import { ReactNode } from "react";
import { useAuthGuard } from "../hooks/useAuthGuard";

type Props = {
    children: ReactNode;
    onAction: () => void;
};

export function AuthAction({ children, onAction }: Props) {
    const { withAuth } = useAuthGuard();

    return (
        <div onClick={() => withAuth(onAction)}>
            {children}
        </div>
    );
}
