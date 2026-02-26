import { Link } from "react-router";
import { useSelector } from "react-redux";
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
} from "../entities/cart";
import { Icon } from "../shared/icons/Icon";
import { selectAuthUser, selectAuthLoading } from "../features/auth/api/authSlice";
import { navigateRoutes } from "../shared/config/routes/navigateRoutes";
import { BagItem } from "@/features/bag/ui/BagItem";

export function CartPage() {
    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);

    const { data: cartItems = [], isLoading } = useGetCartQuery(undefined, {
        skip: authLoading || !user,
    });
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveFromCartMutation();
    const [clearCart] = useClearCartMutation();

    const total = cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0,
    );

    return (
        <div className="container py-6 pb-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="section-title-32">Ваше замовлення</h1>
                {cartItems.length > 0 && (
                    <button
                        onClick={() => clearCart()}
                        className="text-[14px] text-gray-400 hover:text-orange-1 transition-colors"
                    >
                        Очистити
                    </button>
                )}
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-20 text-14-gray">
                    Завантаження...
                </div>
            )}

            {!isLoading && cartItems.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                    <Icon name="bag" className="text-[64px] text-[#d2d2d7]" size={64} />
                    <p className="text-14-gray text-center text-lg">Кошик порожній</p>
                    <Link
                        to={navigateRoutes.navigate.products.list}
                        className="button-element"
                    >
                        До каталогу
                    </Link>
                </div>
            )}

            {!isLoading && cartItems.length > 0 && (
                <div className="flex flex-col gap-3">
                    {cartItems.map((item) => (
                        <BagItem key={item._id} item={item} />
                    ))}

                    <div className="mt-4 bg-white rounded-[12px] p-5">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 text-[16px]">Разом:</span>
                            <span className="text-[28px] font-bold">{total} грн</span>
                        </div>
                        <button className="button-element w-full">
                            Оформити замовлення
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
