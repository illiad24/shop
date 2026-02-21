import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { BagDrawer } from "../../features/bag/ui/BagDrawer";
import { CartBar } from "../../features/bag/ui/CartBar";

export function MainLayout() {
    return (
        <>
            <Header />
            <main className="flex-1 pb-20 md:pb-0">
                <Outlet />
            </main>
            <Footer />
            <BagDrawer />
            <CartBar />
        </>
    )
}
