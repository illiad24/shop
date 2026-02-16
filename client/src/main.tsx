import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { AppErrorBoundary } from './app/providers/ui/AppErrorBoundary'

import './index.css'
import { AuthModalProvider } from './shared/providers/AuthModalProvider'
import { AuthModals } from './shared/components/AuthModals'
import { AppInit } from './app/init/AppInit'
createRoot(document.getElementById('drapak')!).render(
    <AppErrorBoundary>
        <Provider store={store}>
            <AuthModalProvider>
                <RouterProvider router={router} />
                <AppInit />
                <AuthModals />

            </AuthModalProvider>
        </Provider>
    </AppErrorBoundary>
)
