import { ErrorBoundary } from "react-error-boundary"
import { GlobalErrorPage } from "../../../pages/GlobalErrorPage"
export function AppErrorBoundary({ children }) {
    return (
        <ErrorBoundary FallbackComponent={GlobalErrorPage} onError={(error, info) => console.log(error)}>
            {children}
        </ErrorBoundary>
    )
}