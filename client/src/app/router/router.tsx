import { createBrowserRouter } from "react-router";
import { MainLayout } from "../../widgets/layouts";
import { HomePage } from "../../pages/HomePage";
import { GlobalErrorPage } from "../../pages/GlobalErrorPage";
import { PageNotFound } from "../../pages/PageNotFound";
import { DeliveryPage } from "../../pages/DeliveryPage.tsx";
import { AboutPage } from "../../pages/AboutPage.tsx";


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
                path: 'delivery',
                Component: DeliveryPage
            },
            {
                path: 'about',
                Component: AboutPage
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ],
    },
])