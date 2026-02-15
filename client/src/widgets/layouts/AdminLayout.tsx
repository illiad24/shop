
import { NavLink, Outlet, useNavigate } from "react-router";
import { Icon } from "../../shared/icons/Icon";
import { useLogoutMutation } from "../../features/auth/api/authApi";
export function AdminLayout() {
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()
    async function adminLogout() {
        try {
            await logout(null)
            navigate('/admin/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <header className="bg-white">
                <div className="container min-h-[70px] grid items-center grid-cols-[230px_auto]">
                    <div>
                        <h1 className="font-bold text-3xl">ADMIN PANEL</h1>
                    </div>
                    <div className="flex items-center gap-8 justify-end">
                        <div>
                            <div className="font-bold text-[14px] mb-1 last:mb-0 text-[#565656]">
                                Drapak
                            </div>
                            <div className="font-semibold text-[12px] text-gray">
                                Admin
                            </div>
                        </div>
                        <button className="flex items-center gap-4 text-gray transition-colors hover:text-orange-1" onClick={() => adminLogout()}>
                            <Icon name="logout" className="text-2xl" />
                            <span className="text-[18px]">ВИЙТИ</span>
                        </button>
                    </div>
                </div>
            </header >
            <main className="flex-1   bg-white flex flex-col">
                <div className="container grid grid-cols-[230px_auto]  shrink-1 grow-1">
                    <div className=" pr-4 border-r-1 border-[#c2c2c2] pt-3">
                        <NavLink to='/admin' end className={({ isActive }) => `p-3 rounded-[12px] mb-3 last:mb-0 text-black flex items-center gap-4  transition-all hover:bg-blue hover:text-white ${isActive ? 'bg-main text-white' : ''}`}>
                            <div> <Icon name="logout" className="text-2xl" /></div>
                            <div>Товари</div>
                        </NavLink>
                        <NavLink to='/admin/banner' className={({ isActive }) => `p-3 rounded-[12px] mb-3 last:mb-0 text-black flex items-center gap-4  transition-all  hover:bg-blue hover:text-white ${isActive ? 'bg-main text-white' : ''}`}>
                            <div> <Icon name="logout" className="text-2xl" /></div>
                            <div>Банери</div>
                        </NavLink>
                        <NavLink to='/admin/popup' className={({ isActive }) => `p-3 rounded-[12px] mb-3 last:mb-0 text-black flex items-center gap-4  transition-all hover:bg-blue hover:text-white ${isActive ? 'bg-main text-white' : ''}`}>
                            <div> <Icon name="logout" className="text-2xl" /></div>
                            <div>Спливаючі вікна</div>
                        </NavLink>
                    </div>
                    <div className="bg-[#F5F6FA] p-5">
                        <Outlet />
                    </div>
                </div>
            </main>

        </>
    )
}
