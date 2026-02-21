import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeBag } from "../bagSlice";
import type { RootState } from "@/app/store/store";
import {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
} from "@/entities/cart";
import { Icon } from "@/shared/icons/Icon";

export function BagDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.bag.isOpen);

    const { data: cartItems = [], isLoading } = useGetCartQuery(undefined, {
        skip: !isOpen,
    });
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveFromCartMutation();
    const [clearCart] = useClearCartMutation();

    const total = cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0,
    );

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && dispatch(closeBag())}>
            <DialogContent
                className="
                    !top-4 !right-4 !left-auto
                    !translate-x-0 !translate-y-0
                    fixed w-[580px] min-h-[500px] max-h-[calc(100vh-2rem)]
                    flex flex-col p-6 overflow-hidden
                    [&>button:last-child]:hidden
                "
            >
                <div className="flex justify-between items-center mb-4">
                    <DialogTitle className="text-[20px] font-bold">Ваше замовлення</DialogTitle>
                    {cartItems.length > 0 && (
                        <button
                            onClick={() => clearCart()}
                            className="text-[12px] text-gray-400 hover:text-orange-1 transition-colors"
                        >
                            Очистити
                        </button>
                    )}
                </div>

                {isLoading && (
                    <div className="flex-1 flex items-center justify-center text-14-gray">
                        Завантаження...
                    </div>
                )}

                {!isLoading && cartItems.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3">
                        <Icon name="bag" className="text-[48px] text-[#d2d2d7]" />
                        <div className="text-14-gray">Кошик порожній</div>
                    </div>
                )}

                {!isLoading && cartItems.length > 0 && (
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className=" flex items-center justify-between"
                            >
                                <div className="flex shrink-1 w-full items-center gap-3 justify-between p-3 bg-[#f5f5f7] rounded-[12px]">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-black text-[18px] truncate mb-1">
                                            {item.productId.title}
                                        </div>
                                        <div className="text-[14px] text-orange-1">
                                            {item.productId.portionWeightGrams} г
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex gap-4">
                                            <div className="text-gray font-bold text-[18px]">
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
                                                    className="w-8 h-8 flex items-center text-white justify-center bg-orange-1 rounded-[8px] border  hover:border-orange-1 transition-colors font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="text-gray font-bold text-[18px]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateItem({
                                                            productId: item.productId._id,
                                                            quantity: item.quantity + 1,
                                                        })
                                                    }
                                                    className="w-8 h-8 flex text-white items-center justify-center bg-orange-1 rounded-[8px] border  hover:border-orange-1 transition-colors font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeItem(item.productId._id)}
                                    className="text-gray-400 hover:text-orange-1 transition-colors p-1"
                                >
                                    <Icon name="close" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="bg-[#f5f5f7] rounded-[12px] p-5">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-14-gray text-2xl">Разом:</span>
                            <span className="text-[40px] font-bold">{total} грн</span>
                        </div>
                        <button className="button-element w-full">
                            Оформити замовлення
                        </button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
