import { createBrowserRouter } from "react-router";
import { MainLayout } from "../../widgets/layouts";
import { HomePage } from "../../pages/HomePage";
import { GlobalErrorPage } from "../../pages/GlobalErrorPage";
import { PageNotFound } from "../../pages/PageNotFound";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <GlobalErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ],
    },
])