import { createBrowserRouter } from "react-router";
import { MainLayout } from "../../widgets/layouts";
import { HomePage } from "../../pages/HomePage";
import { GlobalErrorPage } from "../../pages/GlobalErrorPage";
import { PageNotFound } from "../../pages/PageNotFound";
import { DeliveryPage } from "../../pages/DeliveryPage.tsx";
import { AboutPage } from "../../pages/AboutPage.tsx";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage.tsx";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <GlobalErrorPage />,
        children: [
            {
                path: '/',
                Component: HomePage,
                handle: {
                    inMainMenu: true,
                    title: 'Головна'
                }
            },
            {
                path: 'delivery',
                Component: DeliveryPage,
                handle: {
                    inMainMenu: true,
                    title: 'Доставка'
                }
            },
            {
                path: 'about',
                Component: AboutPage,
                handle: {
                    inMainMenu: true,
                    title: 'Про нас'
                }
            },
            {
                path: 'products/:id',
                Component: ProductDetailsPage,
            },
            {
                path: '*',
                Component: PageNotFound
            }
        ],
    },
])