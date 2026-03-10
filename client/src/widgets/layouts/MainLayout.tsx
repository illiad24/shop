import { Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { BagDrawer } from "../../features/bag/ui/BagDrawer";
import { CartBar } from "../../features/bag/ui/CartBar";
import { OfflineBanner } from "@/shared/components/OfflineBanner";

function PageFallback() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-orange-1 rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-2.5 h-2.5 bg-orange-1 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2.5 h-2.5 bg-orange-1 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    );
}

export function MainLayout() {
    return (
        <>
            <OfflineBanner />
            <Header />
            <main className="flex-1 pb-20 md:pb-0">
                <Suspense fallback={<PageFallback />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
            <BagDrawer />
            <CartBar />
        </>
    )
}
