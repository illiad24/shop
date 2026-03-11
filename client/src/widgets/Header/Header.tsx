import { useEffect, useState } from "react";
import { Icon } from "../../shared/icons/Icon";
import { router } from "../../app/router/router";
import { NavLink, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../features/category/category.slice";
import { toggleBag } from "../../features/bag/bagSlice";
import type { RootState } from "../../app/store/store";
import { AuthAction } from "@/shared/components/AuthAction";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

import { Link } from 'react-scroll';

export function Header() {
    const routesInMainMenu =
        router.routes[0]?.children?.filter(route => route.handle?.inMainMenu) ?? [];
    const [menuOpen, setMenuOpen] = useState(false)
    const dispatch = useDispatch()

    const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory)

    const location = useLocation()

    const isProductListPage = location.pathname == '/products/list'


    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <header className="relative md:absolute top-1.5  left-0 z-10 w-full  mb-5">
            <div className="px-2.5">
                <div className=" relative z-10 rounded-[12px] bg-white p-2.5 mb-1.5 flex justify-between items-center gap-6">
                    <div className="flex gap-7 relative z-3">
                        <div>
                            <svg width="50" height="50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="paint0_linear" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#00C9FF" />
                                        <stop offset="1" stop-color="#192A56" />
                                    </linearGradient>
                                </defs>

                                <path d="M40 60C40 40 70 40 85 55L100 70L115 55C130 40 160 40 160 60C160 90 100 150 100 150C100 150 40 90 40 60Z"
                                    stroke="url(#paint0_linear)"
                                    stroke-width="12"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    fill="none" />

                                <text x="50%" y="185"
                                    text-anchor="middle"
                                    font-family="Arial, sans-serif"
                                    font-weight="900"
                                    font-size="32"
                                    fill="#192A56">VT</text>
                            </svg>
                        </div>
                        <div className=" gap-2 items-center md:flex hidden">
                            <div><img src="/header/flag.png" alt="Image" /></div>
                            <div>ua</div>
                        </div>
                        <div className="md:block hidden">
                            <div className="text-14-grey text-[12px]">
                                Робочий графік
                            </div>
                            <div className="text-black ">
                                пн-пт
                                10:00 - 22:00
                            </div>
                        </div>
                    </div>
                    <div className=" gap-7 items-center cursor-pointer md:flex hidden">
                        {routesInMainMenu.map((route) => {
                            return (
                                <NavLink key={route.path} to={{ pathname: route.path }} className={({ isActive }) => isActive ? "text-[18px] text-orange-1 transition-all font-semibold hover:text-main " : "text-[18px] text-black transition-all font-semibold hover:text-main"}>
                                    {route.handle?.title}
                                </NavLink>)
                        })}
                    </div>
                    <div className="flex gap-2 items-center relative z-3">
                        <AuthAction onAction={() => console.log('favorite')}>
                            <NavLink to={navigateRoutes.navigate.profile.favorite} className={({ isActive }) => `${isActive ? 'border-orange-1 text-orange-1' : ''} text-gray block text-[20px] p-2.5 border rounded-[12px]  border-[#d2d2d7] transition-all hover:border-orange-1 hover:text-orange-1`}  >
                                <Icon name="favorite" />
                            </NavLink>
                        </AuthAction>
                        <AuthAction onAction={() => console.log('user')}>
                            <NavLink end to={navigateRoutes.navigate.profile.main} className={({ isActive }) => `${isActive ? 'border-orange-1 text-orange-1' : ''} text-gray block text-[20px] p-2.5 border rounded-[12px]  border-[#d2d2d7] transition-all hover:border-orange-1 hover:text-orange-1`}  >
                                <Icon name="user" />
                            </NavLink>
                        </AuthAction>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
                            aria-expanded={menuOpen}
                            className="text-gray text-[20px] p-2.5 border md:hidden flex rounded-[12px] border-[#d2d2d7] transition-all hover:border-orange-1 hover:text-orange-1"
                        >
                            <Icon name="menu" className={menuOpen ? "hidden" : "block"} />
                            <Icon name="close" className={menuOpen ? "block" : "hidden"} />
                        </button>

                        <button onClick={() => dispatch(toggleBag())} aria-label="Відкрити кошик" className="cursor-pointer text-gray text-[20px] md:flex hidden py-2.5 px-5 border rounded-[12px] border-[#d2d2d7] items-center gap-2 transition-all hover:border-orange-1 hover:text-orange-1">
                            <span className="text-[14px]">Кошик</span>
                            <Icon name="bag" />
                        </button>
                    </div>
                </div>
                <div className={` menuOpen:hidden overflow-auto md:hidden fixed top-0  transition-all w-full h-full bg-[#fbfbfb] py-30 px-4 ${menuOpen ? "left-0" : "left-[100%]"}`}>
                    <div className="mb-6 last:mb-0">
                        <div className="text-[16px] text-gray mb-2 last:mb-0">Навігація</div>
                        <div className="grid grid-cols-2 gap-3">
                            {routesInMainMenu.map((route) => {
                                return (
                                    <NavLink key={route.path} to={{ pathname: route.path }} className={({ isActive }) => `text-[14px] bg-white text-center  border-1 rounded-[12px] text-black w-full py-3 transition-all font-semibold hover:text-main    hover:border-1 hover:border-orange-1 hover:text-orange-1 transition-all ${isActive ? "text-orange-1 col-span-2 border-orange-1" : ""}`}>
                                        {route.handle?.title}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mb-6 last:mb-0">
                        <div className="text-[16px] text-gray mb-2 last:mb-0">Ассортимент</div>
                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl  hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white">
                                <div className="shrink-0 w-6">
                                    <img className="w-6 h-6" src="/types/01.svg" alt="Image" />
                                </div>
                                <div className="text-14-gray">
                                    Охолоджена
                                    продукція
                                </div>
                            </div>
                            <div className=" flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl  hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white">
                                <div className="shrink-0 w-6">
                                    <img className="w-6 h-6" src="/types/02.svg" alt="Image" />
                                </div>
                                <div className="text-14-gray">
                                    Заморозка
                                </div>
                            </div>
                            <div className=" flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl  hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white">
                                <div className="shrink-0 w-6">
                                    <img className="w-6 h-6" src="/types/03.svg" alt="Image" />
                                </div>
                                <div className="text-14-gray">
                                    Готова продукція
                                </div>
                            </div>
                            <div className=" flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl  hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white">
                                <div className="shrink-0 w-6">
                                    <img className="w-6 h-6" src="/types/04.svg" alt="Image" />
                                </div>
                                <div className="text-14-gray">
                                    Маринована
                                    продукція
                                </div>
                            </div>
                            <div className=" flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl  hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white">
                                <div className="shrink-0 w-6">
                                    <img className="w-6 h-6" src="/types/05.svg" alt="Image" />
                                </div>
                                <div className="text-14-gray">
                                    Снеки
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex justify-center items-center pl-2.5. `}>
                <div className="flex justify-stretch items-stretch gap-2 md:justify-center md:items-center bg-transparent rounded-[12px] px-5 py-2.5 md:bg-white overflow-auto" >
                    <Link to="CHILLED" smooth={true} duration={500} onClick={() => dispatch(selectCategory('CHILLED'))} className={`flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl max-w-[165px] hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white ${selectedCategory == 'CHILLED' && isProductListPage ? '!bg-[#0D407E]/[0.06]' : ''}`}>
                        <div className="shrink-0 w-6">
                            <img className="w-6 h-6" src="/types/01.svg" alt="Image" />
                        </div>
                        <div className="text-14-gray">
                            Охолоджена
                            продукція
                        </div>
                    </Link>
                    <Link to="FROZEN" smooth={true} duration={500} onClick={() => dispatch(selectCategory('FROZEN'))} className={`flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl max-w-[165px] hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white ${selectedCategory == 'FROZEN' && isProductListPage ? '!bg-[#0D407E]/[0.06]' : ''}`}>
                        <div className="shrink-0 w-6">
                            <img className="w-6 h-6" src="/types/02.svg" alt="Image" />
                        </div>
                        <div className="text-14-gray">
                            Заморозка
                        </div>
                    </Link>
                    <Link to="READY" smooth={true} duration={500} onClick={() => dispatch(selectCategory('READY'))} className={`flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl max-w-[165px] hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white ${selectedCategory == 'READY' && isProductListPage ? '!bg-[#0D407E]/[0.06]' : ''}`}>
                        <div className="shrink-0 w-6">
                            <img className="w-6 h-6" src="/types/03.svg" alt="Image" />
                        </div>
                        <div className="text-14-gray">
                            Готова продукція
                        </div>
                    </Link>
                    <Link to="MARINATED" smooth={true} duration={500} onClick={() => dispatch(selectCategory('MARINATED'))} className={`flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl max-w-[165px] hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white ${selectedCategory == 'MARINATED' && isProductListPage ? '!bg-[#0D407E]/[0.06]' : ''}`}>
                        <div className="shrink-0 w-6">
                            <img className="w-6 h-6" src="/types/04.svg" alt="Image" />
                        </div>
                        <div className="text-14-gray">
                            Маринована
                            продукція
                        </div>
                    </Link>
                    <Link to="SNACKS" smooth={true} duration={500} onClick={() => dispatch(selectCategory('SNACKS'))} className={`flex gap-2.5 items-center gap-2 py-2 px-5 rounded-2xl max-w-[165px] hover:bg-[#0D407E]/[0.06] cursor-pointer transition-all bg-white ${selectedCategory == 'SNACKS' && isProductListPage ? '!bg-[#0D407E]/[0.06]' : ''}`}>
                        <div className="shrink-0 w-6">
                            <img className="w-6 h-6" src="/types/05.svg" alt="Image" />
                        </div>
                        <div className="text-14-gray">
                            Снеки
                        </div>
                    </Link>
                </div>
            </div>


        </header >
    )
}