import { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { guestClearCart } from "@/features/guestCart/guestCartSlice";

export function OrderSuccessPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Clear guest cart after successful Stripe payment redirect
        dispatch(guestClearCart());
    }, [dispatch]);

    return (
        <div className="pt-10 md:pt-45 pb-20">
            <div className="container">
                <div className="max-w-[489px] mx-auto">
                    <div className="bg-white rounded-[12px] text-center p-10 max-md:p-6 flex flex-col items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <div className="section-title-24 mb-2">Оплата успішна!</div>
                            <div className="text-[15px] text-[#686870]">
                                Дякуємо за замовлення. Ми вже дбайливо пакуємо ваші морепродукти та готуємо їх до відправки.
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <NavLink className="button-element block text-center w-full" to={navigateRoutes.navigate.profile.main}>
                                Мої замовлення
                            </NavLink>
                            <NavLink
                                className="block text-center text-[14px] text-[#686870] hover:text-orange-1 transition-colors"
                                to={navigateRoutes.navigate.home}
                            >
                                На головну
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
