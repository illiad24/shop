
import { Icon } from "@/shared/icons/Icon";
import { Outlet } from "react-router";

export function Profile() {
    return (
        <div className="pt-40">
            <div className="container grid grid-cols-[320px_1fr]">
                <div className="bg-white rounded-[12px] p-5">
                    <div>
                        user info
                    </div>
                    <div>
                        <div className="flex gap-2 items-center px-5 py-2.5 mb-4 last:mb-0">
                            <div>
                                <Icon name="favorite" className="text-[14px] font-light" />
                            </div>
                            <div className=" font-light text-[18px]">
                                Вподобані  товари
                            </div>
                        </div>
                        <div className="flex gap-2 items-center px-5 py-2.5 mb-4 last:mb-0">
                            <div>
                                <Icon name="favorite" className="text-[14px] font-light" />
                            </div>
                            <div className="font-light text-[18px]">
                                Вподобані  товари
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    content
                    <Outlet />
                </div>
            </div>
        </div>
    )
}