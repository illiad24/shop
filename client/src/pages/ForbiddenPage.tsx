import { NavLink } from "react-router";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";

export function ForbiddenPage() {
    return (
        <div className="pt-10 md:pt-45 pb-20">
            <div className="container">
                <div className="max-w-[489px] mx-auto">
                    <div className="bg-white rounded-[12px] text-center p-10 max-md:p-6 flex flex-col items-center gap-5">
                        <div className="text-[64px] font-bold text-orange-1">403</div>
                        <div>
                            <div className="section-title-24 mb-2">Доступ заборонено</div>
                            <div className="text-[15px] text-[#686870]">
                                У вас немає прав для перегляду цієї сторінки.
                            </div>
                        </div>
                        <NavLink
                            className="button-element block text-center w-full"
                            to={navigateRoutes.navigate.home}
                        >
                            На головну
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
