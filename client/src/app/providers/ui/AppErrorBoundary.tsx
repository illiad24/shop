import { ErrorBoundary } from "react-error-boundary"
import { GlobalErrorPage } from "../../../pages/GlobalErrorPage"
import type { ReactNode } from "react";
type AppErrorBoundaryProps = {
    children: ReactNode;
};
export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
    return (
        <ErrorBoundary FallbackComponent={GlobalErrorPage} onError={(error) => console.log(error)}>
            {children}
        </ErrorBoundary>
    )
}