import * as Sentry from "@sentry/react";
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { AppErrorBoundary } from './app/providers/ui/AppErrorBoundary'
import { Toaster } from 'sonner'

import './i18n/i18n'

import './index.css'
import { AuthModalProvider } from './shared/providers/AuthModalProvider'
import { AuthModals } from './shared/components/AuthModals'
import { AppInit } from './app/init/AppInit'
import { GuestCartMerger } from './features/guestCart/GuestCartMerger'

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    enabled: !!import.meta.env.VITE_SENTRY_DSN,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
});
createRoot(document.getElementById('drapak')!).render(
    <AppErrorBoundary>
        <Provider store={store}>
            <AuthModalProvider>
                <RouterProvider router={router} />
                <AppInit />
                <GuestCartMerger />
                <AuthModals />
                <Toaster position="bottom-right" richColors />
            </AuthModalProvider>
        </Provider>
    </AppErrorBoundary>
)
