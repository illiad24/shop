import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { BagDrawer } from "../../features/bag/ui/BagDrawer";

export function MainLayout() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <BagDrawer />
        </>
    )
}
