import { createBrowserRouter } from "react-router";
import { MainLayout } from "../../widgets/layouts";
import { HomePage } from "../../pages/HomePage";
import { GlobalErrorPage } from "../../pages/GlobalErrorPage";
import { PageNotFound } from "../../pages/PageNotFound";
import { DeliveryPage } from "../../pages/DeliveryPage.tsx";
import { AboutPage } from "../../pages/AboutPage.tsx";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage.tsx";
import { AdminProductsPage } from "../../pages/admin/AdminProductsPage.tsx";
import { authCheckLoader } from "./authCheckLoader.ts";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage.tsx";
import { AdminLayout } from "../../widgets/layouts/AdminLayout.tsx";
import { AdminBannerPage } from "../../pages/admin/AdminBannerPage.tsx";
import { AdminPopupPage } from "../../pages/admin/AdminPopupPage.tsx";
import { ForbiddenPage } from "../../pages/ForbiddenPage.tsx";
import { Mutex } from 'async-mutex'
import { CatalogPage } from "../../pages/CatalogPage.tsx";

import { Profile } from "@/pages/profile/Profile.tsx";
import { CartPage } from "../../pages/CartPage.tsx";
const mutex = new Mutex();
type roles = 'ADMIN' | 'USER'
const adminRoles: roles[] = ['ADMIN'];

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
                path: 'products/list',
                Component: CatalogPage,
                handle: {
                    inMainMenu: true,
                    title: 'Каталог'
                }
            },

            {
                path: 'profile',
                Component: Profile
            },

            {
                path: 'cart',
                Component: CartPage
            },

            {
                path: '*',
                Component: PageNotFound
            }
        ],
    },
    {
        path: 'admin',
        Component: AdminLayout,
        errorElement: <GlobalErrorPage />,
        loader: () => authCheckLoader({ mutex, requiredRoles: adminRoles }),
        handle: {
            permission: adminRoles,
        },
        children: [
            {
                index: true,
                Component: AdminProductsPage,
            },
            {
                path: 'banner',
                Component: AdminBannerPage,
            },
            {
                path: 'popup',
                Component: AdminPopupPage,
            },

        ]
    },
    {
        path: 'admin/login',
        Component: AdminLoginPage,
    },
    {
        path: 'forbidden',
        Component: ForbiddenPage
    }
])

