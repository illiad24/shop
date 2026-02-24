
import { useLogoutMutation } from "@/features/auth/api/authApi";
import { logout } from "@/features/auth/api/authSlice";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Icon } from "@/shared/icons/Icon";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

export function Profile() {
    const [logoutMutation] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        await logoutMutation();
        dispatch(logout());
        navigate(navigateRoutes.navigate.home);
    }

    return (
        <div className="pt-5 md:pt-50 pb-10">
            <div className="container grid gap-4 grid-cols-1 md:grid-cols-[320px_1fr]">
                <div className="bg-transparent self-start md:bg-white rounded-[12px] md:p-5 p-0">
                    <div className="mb-3 max-md:bg-white max-md:rounded-[12px] max-md:p-5">
                        <div>
                            <div className="font-semibold text-[18px] mb-1">
                                Drapak
                            </div>
                            <div className="font-regular text-[18px]">
                                +0980757473
                            </div>
                        </div>
                        <div onClick={handleLogout} className="flex gap-2 items-center text-[#686870] py-2.5 mb-4 last:mb-0 cursor-pointer hover:text-orange-1 transition-all flex md:hidden">
                            <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                <Icon name="logout" className="text-[14px] font-light" />
                            </div>
                            <div className="font-light text-[18px]">
                                Вийти
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white rounded-[12px] max-md:p-4 max-md:flex max-md:gap-2.5  overflow-auto">
                            <NavLink end to={navigateRoutes.navigate.profile.history} className={({ isActive }) => `flex max-md:flex-col max-md:text-center gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 transition-all ${isActive ? "text-orange-1 rounded-[12px] bg-[#f5f5f7]" : "hover:text-orange-1"}`}>
                                <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                    <Icon name="history" className="text-[14px] font-light" />
                                </div>
                                <div className=" font-light text-[18px] max-md:text-[14px]">
                                    Історія замовлень
                                </div>
                            </NavLink>
                            <NavLink to={navigateRoutes.navigate.profile.address} className={({ isActive }) => `flex max-md:flex-col max-md:text-center gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 cursor-pointer transition-all ${isActive ? "text-orange-1 rounded-[12px] bg-[#f5f5f7]" : "hover:text-orange-1"}`}>
                                <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                    <Icon name="location" className="text-[14px] font-light" />
                                </div>
                                <div className="font-light text-[18px] max-md:text-[14px]">
                                    Адреса доставки
                                </div>
                            </NavLink>
                            <NavLink to={navigateRoutes.navigate.profile.favorite} className={({ isActive }) => `flex max-md:flex-col max-md:text-center gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 cursor-pointer transition-all ${isActive ? "text-orange-1 rounded-[12px] bg-[#f5f5f7]" : "hover:text-orange-1"}`}>
                                <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                    <Icon name="favorite" className="text-[14px] font-light" />
                                </div>
                                <div className="font-light text-[18px] max-md:text-[14px]">
                                    Вподобані  товари
                                </div>
                            </NavLink>
                        </div>
                        <div onClick={handleLogout} className=" gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 cursor-pointer hover:text-orange-1 transition-all hidden md:flex">
                            <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                <Icon name="logout" className="text-[14px] font-light" />
                            </div>
                            <div className="font-light text-[18px]">
                                Вийти
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}