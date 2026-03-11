import { NavLink, useNavigate } from "react-router";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

export function OrderCancelPage() {
    const navigate = useNavigate();

    return (
        <div className="pt-10 md:pt-45 pb-20">
            <div className="container">
                <div className="max-w-[489px] mx-auto">
                    <div className="bg-white rounded-[12px] text-center p-10 max-md:p-6 flex flex-col items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-orange-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <div className="section-title-24 mb-2">Оплату скасовано</div>
                            <div className="text-[15px] text-[#686870]">
                                Ваше замовлення збережено. Ви можете повернутись і спробувати оплатити знову.
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={() => navigate(-1)}
                                className="button-element w-full"
                            >
                                Спробувати знову
                            </button>
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
