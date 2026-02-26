import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { EmptyFiledInfo } from "./EmptyFiledInfo";

export function OrderHistory() {
    return (
        <div>
            <EmptyFiledInfo imgSrc='/favorite/profile.png' title='У вас ще немає замовлень' description='Тут відображатимуться ваші попередні та активні замовлення, щойно ви зробите перше.' linkText='Зробити замовлення' linkUrl={navigateRoutes.navigate.products.list} />
        </div>
    )
}