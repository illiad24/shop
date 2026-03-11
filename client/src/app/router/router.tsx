import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { MainLayout } from "../../widgets/layouts";
import { GlobalErrorPage } from "../../pages/GlobalErrorPage";
import { PageNotFound } from "../../pages/PageNotFound";
import { authCheckLoader } from "./authCheckLoader.ts";
import { AdminLoginPage } from "../../pages/admin/AdminLoginPage.tsx";
import { AdminLayout } from "../../widgets/layouts/AdminLayout.tsx";
import { ForbiddenPage } from "../../pages/ForbiddenPage.tsx";
import { Mutex } from 'async-mutex'

// Lazy-loaded pages (code splitting — кожна сторінка завантажується окремо)
const HomePage = lazy(() => import("../../pages/HomePage").then(({ HomePage }) => ({ default: HomePage })));
const DeliveryPage = lazy(() => import("../../pages/DeliveryPage").then(({ DeliveryPage }) => ({ default: DeliveryPage })));
const AboutPage = lazy(() => import("../../pages/AboutPage").then(({ AboutPage }) => ({ default: AboutPage })));
const ProductDetailsPage = lazy(() => import("../../pages/ProductDetailsPage").then(({ ProductDetailsPage }) => ({ default: ProductDetailsPage })));
const CatalogPage = lazy(() => import("../../pages/CatalogPage").then(({ CatalogPage }) => ({ default: CatalogPage })));
const Profile = lazy(() => import("@/pages/profile/Profile").then(({ Profile }) => ({ default: Profile })));
const CartPage = lazy(() => import("../../pages/CartPage").then(({ CartPage }) => ({ default: CartPage })));
const OrderPage = lazy(() => import("@/pages/OrderPage").then(({ OrderPage }) => ({ default: OrderPage })));
const OrderSuccessPage = lazy(() => import("../../pages/OrderSuccessPage").then(({ OrderSuccessPage }) => ({ default: OrderSuccessPage })));
const OrderCancelPage = lazy(() => import("../../pages/OrderCancelPage").then(({ OrderCancelPage }) => ({ default: OrderCancelPage })));
const Favorite = lazy(() => import("@/widgets/profile/Favorite").then(({ Favorite }) => ({ default: Favorite })));
const OrderHistory = lazy(() => import("@/widgets/profile/OrderHistory").then(({ OrderHistory }) => ({ default: OrderHistory })));
const Address = lazy(() => import("@/widgets/profile/Address").then(({ Address }) => ({ default: Address })));

// Admin lazy pages
const AdminProductsPage = lazy(() => import("../../pages/admin/AdminProductsPage").then(({ AdminProductsPage }) => ({ default: AdminProductsPage })));
const AdminBannerPage = lazy(() => import("../../pages/admin/AdminBannerPage").then(({ AdminBannerPage }) => ({ default: AdminBannerPage })));
const AdminPopupPage = lazy(() => import("../../pages/admin/AdminPopupPage").then(({ AdminPopupPage }) => ({ default: AdminPopupPage })));

const mutex = new Mutex();
type roles = 'ADMIN' | 'USER'
const adminRoles: roles[] = ['ADMIN'];
const userRoles: roles[] = ['USER', 'ADMIN'];

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
                Component: Profile,
                loader: () => authCheckLoader({ mutex, requiredRoles: userRoles, redirectTo: '/' }),
                children: [
                    {
                        index: true,
                        Component: OrderHistory
                    },
                    {
                        path: 'favorite',
                        Component: Favorite
                    },
                    {
                        path: 'address',
                        Component: Address
                    },
                ]
            },
            {
                path: 'cart',
                Component: CartPage
            },
            {
                path: 'order',
                Component: OrderPage
            },
            {
                path: 'order/success',
                Component: OrderSuccessPage
            },
            {
                path: 'order/cancel',
                Component: OrderCancelPage
            },
            {
                path: '*',
                Component: PageNotFound
            },
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
