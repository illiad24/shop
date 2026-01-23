import { Outlet } from "react-router";
import { Header } from "../Header/Header";

export function MainLayout() {
    return (
        <>
            <Header />
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </>
    )
}