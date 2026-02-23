
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Icon } from "@/shared/icons/Icon";
import { NavLink, Outlet } from "react-router";

export function Profile() {
    return (
        <div className="pt-50 pb-10">
            <div className="container grid gap-4 grid-cols-[320px_1fr]">
                <div className="bg-white rounded-[12px] p-5">
                    <div className="mb-3">
                        <div className="font-semibold text-[18px] mb-1">
                            Drapak
                        </div>
                        <div className="font-regular text-[18px]">
                            +0980757473
                        </div>
                    </div>
                    <div>
                        <NavLink end to={navigateRoutes.navigate.profile.history} className={({ isActive }) => `flex gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 transition-all ${isActive ? "text-orange-1 rounded-[12px] bg-[#f5f5f7]" : "hover:text-orange-1"}`}>
                            <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                <Icon name="history" className="text-[14px] font-light" />
                            </div>
                            <div className=" font-light text-[18px]">
                                Історія замовлень
                            </div>
                        </NavLink>
                        <NavLink to={navigateRoutes.navigate.profile.address} className={({ isActive }) => `flex gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 cursor-pointer transition-all ${isActive ? "text-orange-1 rounded-[12px] bg-[#f5f5f7]" : "hover:text-orange-1"}`}>
                            <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                <Icon name="location" className="text-[14px] font-light" />
                            </div>
                            <div className="font-light text-[18px]">
                                Адреса доставки
                            </div>
                        </NavLink>
                        <NavLink to={navigateRoutes.navigate.profile.favorite} className={({ isActive }) => `flex gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 cursor-pointer transition-all ${isActive ? "text-orange-1 rounded-[12px] bg-[#f5f5f7]" : "hover:text-orange-1"}`}>
                            <div className="rounded-[12px] bg-white p-2 w-10 h-10 flex items-center justify-center">
                                <Icon name="favorite" className="text-[14px] font-light" />
                            </div>
                            <div className="font-light text-[18px]">
                                Вподобані  товари
                            </div>
                        </NavLink>
                        <div className="flex gap-2 items-center px-5 py-2.5 mb-4 last:mb-0 cursor-pointer hover:text-orange-1 transition-all">
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