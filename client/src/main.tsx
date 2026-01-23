import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'


createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router} />

)
