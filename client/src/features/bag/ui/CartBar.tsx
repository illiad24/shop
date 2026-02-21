import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../auth/api/authSlice";
import { useGetCartQuery } from "../../../entities/cart";
import { Icon } from "../../../shared/icons/Icon";
import { navigateRoutes } from "../../../shared/config/routes/navigateRoutes";

export function CartBar() {
    const user = useSelector(selectAuthUser);
    const { data: cartItems = [] } = useGetCartQuery(undefined, { skip: !user });

    const total = cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0,
    );
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (!user || cartItems.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <Link
                to={navigateRoutes.navigate.cart}
                className="flex items-center justify-between bg-orange-1 text-white px-5 py-4"
            >
                <span className="font-semibold text-[15px]">
                    {count} {count === 1 ? "товар" : count < 5 ? "товари" : "товарів"} • {total} грн
                </span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-[15px]">Оформити</span>
                    <Icon name="bag" size={20} />
                </div>
            </Link>
        </div>
    );
}
