import { Link } from "react-router";
import { useSelector } from "react-redux";
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
} from "../entities/cart";
import { Icon } from "../shared/icons/Icon";
import { selectAuthUser } from "../features/auth/api/authSlice";
import { navigateRoutes } from "../shared/config/routes/navigateRoutes";

export function CartPage() {
    const user = useSelector(selectAuthUser);

    const { data: cartItems = [], isLoading } = useGetCartQuery(undefined, {
        skip: !user,
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
                        <div
                            key={item._id}
                            className="flex items-center justify-between gap-3"
                        >
                            <div className="flex flex-1 items-center gap-3 justify-between p-4 bg-white rounded-[12px]">
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-black text-[16px] truncate mb-1">
                                        {item.productId.title}
                                    </div>
                                    <div className="text-[13px] text-orange-1">
                                        {item.productId.portionWeightGrams} г
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-black font-bold text-[16px] whitespace-nowrap">
                                        {item.productId.price} грн
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                updateItem({
                                                    productId: item.productId._id,
                                                    quantity: item.quantity - 1,
                                                })
                                            }
                                            className="w-8 h-8 flex items-center text-white justify-center bg-orange-1 rounded-[8px] hover:bg-orange-1/80 transition-colors font-bold"
                                        >
                                            −
                                        </button>
                                        <span className="text-black font-bold text-[16px] w-5 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateItem({
                                                    productId: item.productId._id,
                                                    quantity: item.quantity + 1,
                                                })
                                            }
                                            className="w-8 h-8 flex text-white items-center justify-center bg-orange-1 rounded-[8px] hover:bg-orange-1/80 transition-colors font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => removeItem(item.productId._id)}
                                className="text-gray-400 hover:text-orange-1 transition-colors p-1 shrink-0"
                            >
                                <Icon name="close" />
                            </button>
                        </div>
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
