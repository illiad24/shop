import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeBag } from "../bagSlice";
import type { RootState } from "@/app/store/store";
import { useClearCartMutation } from "@/entities/cart";
import { Icon } from "@/shared/icons/Icon";
import { NavLink } from "react-router";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { BagItem } from "./BagItem";
import { useCart } from "@/shared/hooks/useCart";
import { selectAuthUser } from "@/features/auth/api/authSlice";
import { guestClearCart } from "@/features/guestCart/guestCartSlice";

export function BagDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.bag.isOpen);
    const user = useSelector(selectAuthUser);

    const { items: cartItems, isLoading } = useCart();
    const [clearCart] = useClearCartMutation();

    const handleClear = () => {
        if (user) clearCart();
        else dispatch(guestClearCart());
    };

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
                    
                "
            >
                <div className="flex justify-between items-center mb-4">
                    <DialogTitle className="text-[20px] font-bold">Ваше замовлення</DialogTitle>

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
                            <BagItem key={item._id} item={item} />
                        ))}
                        {cartItems.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="text-[12px] text-gray-400 hover:text-orange-1 transition-colors"
                            >
                                Очистити
                            </button>
                        )}
                    </div>
                )}
                {cartItems.length > 0 && (
                    <div className="bg-[#f5f5f7] rounded-[12px] p-5">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-14-gray text-2xl">Разом:</span>
                            <span className="text-[40px] font-bold">{total} грн</span>
                        </div>
                        <NavLink onClick={() => dispatch(closeBag())} to={navigateRoutes.navigate.order} className="button-element block text-center w-full">
                            Оформити замовлення
                        </NavLink>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
