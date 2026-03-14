import { NavLink } from "react-router";
import { navigateRoutes } from "../../shared/config/routes/navigateRoutes";

export function Footer() {
    return (
        <footer className="relative bg-white  border-t border-[#f4e8df] pt-20 bg-[#fff]">
            <div className="absolute bottom-0 left-0 w-full h-full z-2 pointer-events-none">
                <img className="absolute bottom-0 left-0 w-full h-full object-cover" src="/footer.png" alt="Image" />
            </div>
            <div className="container pb-9 text-center sm:text-left">
                <div className="grid grid-cols-1 justify-items-center  sm:grid-cols-3 md:grid-cols-5 gap-4 pb-10">
                    <div>
                        <NavLink to={navigateRoutes.navigate.home}>

                            <svg width="153" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="paint0_linear" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#00C9FF" />
                                        <stop offset="1" stopColor="#192A56" />
                                    </linearGradient>
                                </defs>

                                <path d="M40 60C40 40 70 40 85 55L100 70L115 55C130 40 160 40 160 60C160 90 100 150 100 150C100 150 40 90 40 60Z"
                                    stroke="url(#paint0_linear)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none" />

                                <text x="50%" y="185"
                                    textAnchor="middle"
                                    fontFamily="Arial, sans-serif"
                                    fontWeight="900"
                                    fontSize="32"
                                    fill="#192A56">VT</text>
                            </svg>
                        </NavLink>
                    </div>
                    <div>
                        <div className="text-gray text-[16px] leading-tight mb-5 last:mb-0">Навігація</div>
                        <NavLink to={navigateRoutes.navigate.home} className="footer-item-link mb-4 last:mb-0 block">
                            Головна
                        </NavLink>
                        <NavLink to="/delivery" className="footer-item-link mb-4 last:mb-0 block">
                            Доставка
                        </NavLink>
                        <NavLink to="/about" className="footer-item-link mb-4 last:mb-0 block">
                            Про нас
                        </NavLink>
                        <NavLink to={navigateRoutes.navigate.products.list} className="footer-item-link mb-4 last:mb-0 block">
                            Каталог
                        </NavLink>
                    </div>
                    <div>
                        <div className="text-gray text-[16px] leading-tight mb-5 last:mb-0">Контакти</div>
                        <a href="tel:+3832334344343" className="footer-item-link mb-4 last:mb-0 block">
                            +38 323 3434 4343
                        </a>
                    </div>
                    <div>
                        <div className="text-gray text-[16px] leading-tight mb-5 last:mb-0">Час роботи</div>
                        <div className="footer-item-link hover:text-black">
                            з 10:00 до 22:00
                        </div>
                    </div>
                    <div>
                        <div className="text-gray text-[16px] leading-tight mb-5 last:mb-0">Ми в соц мережах</div>
                        <div className="flex gap-4 justify-center sm:justify-start">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4678 26.7793C21.2635 26.7793 26.7725 21.2703 26.7725 14.4746C26.7725 7.67892 21.2635 2.16992 14.4678 2.16992C7.67208 2.16992 2.16309 7.67892 2.16309 14.4746C2.16309 21.2703 7.67208 26.7793 14.4678 26.7793Z" fill="url(#paint0_linear_2128_8255)" />
                                    <path d="M17.0822 7.63867H11.8596C9.52988 7.63867 7.6377 9.53086 7.6377 11.8605V17.0832C7.6377 19.4129 9.52988 21.3051 11.8596 21.3051H17.0822C19.4119 21.3051 21.3041 19.4129 21.3041 17.0832V11.8605C21.3041 9.53086 19.4119 7.63867 17.0822 7.63867ZM19.7783 17.0887C19.7783 18.5762 18.5697 19.7902 17.0768 19.7902H11.8541C10.3666 19.7902 9.15254 18.5816 9.15254 17.0887V11.866C9.15254 10.3785 10.3611 9.16445 11.8541 9.16445H17.0768C18.5643 9.16445 19.7783 10.373 19.7783 11.866V17.0887Z" fill="white" />
                                    <path d="M14.4677 10.9805C12.5427 10.9805 10.9731 12.55 10.9731 14.475C10.9731 16.4 12.5427 17.9695 14.4677 17.9695C16.3927 17.9695 17.9622 16.4 17.9622 14.475C17.9622 12.55 16.3927 10.9805 14.4677 10.9805ZM14.4677 16.5969C13.2974 16.5969 12.3458 15.6453 12.3458 14.475C12.3458 13.3047 13.2974 12.3531 14.4677 12.3531C15.638 12.3531 16.5896 13.3047 16.5896 14.475C16.5896 15.6453 15.638 16.5969 14.4677 16.5969Z" fill="white" />
                                    <path d="M18.2285 11.3634C18.5504 11.3112 18.7691 11.0079 18.7169 10.6859C18.6647 10.364 18.3614 10.1453 18.0395 10.1975C17.7175 10.2497 17.4989 10.553 17.551 10.8749C17.6032 11.1969 17.9065 11.4156 18.2285 11.3634Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_2128_8255" x1="5.09866" y1="23.8437" x2="22.585" y2="6.3574" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FEE411" />
                                            <stop offset="0.0518459" stopColor="#FEDB16" />
                                            <stop offset="0.1381" stopColor="#FEC125" />
                                            <stop offset="0.2481" stopColor="#FE983D" />
                                            <stop offset="0.3762" stopColor="#FE5F5E" />
                                            <stop offset="0.5" stopColor="#FE2181" />
                                            <stop offset="1" stopColor="#9000DC" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.466667" y="0.466667" width="27.0667" height="27.0667" rx="13.5333" fill="#3B5999" />
                                    <rect x="0.466667" y="0.466667" width="27.0667" height="27.0667" rx="13.5333" stroke="#3B5999" strokeWidth="0.933333" />
                                    <path d="M18.8094 8.8361V6.10451C18.8094 6.10451 16.0143 6.08008 15.8237 6.08008C14.5581 6.08008 12.7452 7.51673 12.7452 9.14884V12.0759H10.126V15.1789H12.7061V22.8801H15.7602V15.1398H18.4625L18.8045 12.1052H15.7944C15.7944 12.1052 15.7944 10.2434 15.7944 9.87694C15.7944 9.3443 16.1951 8.81655 16.801 8.81655C17.2066 8.82144 18.8094 8.8361 18.8094 8.8361Z" fill="white" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between flex-col sm:flex-row border-t border-[rgba(128,128,128,0.2)] pt-8">
                    <div className="text-14">
                        © All rights reserved.
                    </div>
                    <a href="#" className="text-14 underline hover:text-orange-1">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    )
}
