
import { useLogoutMutation, useUpdateMeMutation } from "@/features/auth/api/authApi";
import { logout, selectAuthUser } from "@/features/auth/api/authSlice";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Icon } from "@/shared/icons/Icon";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export function Profile() {
    const [logoutMutation] = useLogoutMutation();
    const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectAuthUser);

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "" });

    async function handleLogout() {
        await logoutMutation(undefined);
        dispatch(logout());
        navigate(navigateRoutes.navigate.home);
    }

    function handleEditOpen() {
        setForm({ name: user?.name ?? "", email: user?.email ?? "" });
        setIsEditing(true);
    }

    async function handleEditSubmit(e: React.FormEvent) {
        e.preventDefault();
        await updateMe(form);
        setIsEditing(false);
    }

    return (
        <div className="pt-5 md:pt-50 pb-10">
            <div className="container grid gap-4 grid-cols-1 md:grid-cols-[320px_1fr]">
                <div className="bg-transparent self-start md:bg-white rounded-[12px] md:p-5 p-0">
                    <div className="mb-3 max-md:bg-white max-md:rounded-[12px] max-md:p-5">
                        {isEditing ? (
                            <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 mb-3">
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="Ім'я"
                                    required
                                    className="border border-gray-200 rounded-[8px] px-3 py-2 text-[14px] outline-none focus:border-orange-1"
                                />
                                <input
                                    value={form.email}
                                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                    placeholder="Email"
                                    type="email"
                                    required
                                    className="border border-gray-200 rounded-[8px] px-3 py-2 text-[14px] outline-none focus:border-orange-1"
                                />
                                <div className="flex gap-2">
                                    <button type="submit" disabled={isUpdating} className="button-element text-[13px]">
                                        {isUpdating ? "Збереження..." : "Зберегти"}
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-[8px] border border-gray-200 text-[13px] hover:border-gray-400 transition-all">
                                        Скасувати
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <div className="font-semibold text-[18px] mb-1">{user?.name}</div>
                                    <div className="font-regular text-[18px]">{user?.email}</div>
                                </div>
                                <button onClick={handleEditOpen} className="text-[#686870] hover:text-orange-1 transition-all mt-1">
                                    <Icon name="edit" />
                                </button>
                            </div>
                        )}
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
