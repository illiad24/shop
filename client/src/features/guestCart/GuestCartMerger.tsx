import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/api/authSlice";
import { selectGuestCart, guestClearCart } from "./guestCartSlice";
import { useAddToCartMutation, useUpdateCartItemMutation } from "@/entities/cart";

export function GuestCartMerger() {
    const user = useSelector(selectAuthUser);
    const guestCart = useSelector(selectGuestCart);
    const dispatch = useDispatch();
    const [addToCart] = useAddToCartMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const prevUser = useRef(user);

    useEffect(() => {
        const justLoggedIn = !prevUser.current && !!user;
        prevUser.current = user;

        if (!justLoggedIn || guestCart.length === 0) return;

        const merge = async () => {
            for (const item of guestCart) {
                await addToCart(item.productId._id);
                if (item.quantity > 1) {
                    await updateItem({ productId: item.productId._id, quantity: item.quantity });
                }
            }
            dispatch(guestClearCart());
        };

        merge();
    }, [user]);

    return null;
}
