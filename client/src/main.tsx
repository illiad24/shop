import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { AppErrorBoundary } from './app/providers/ui/AppErrorBoundary'


createRoot(document.getElementById('root')!).render(
    <AppErrorBoundary>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </AppErrorBoundary>
)
