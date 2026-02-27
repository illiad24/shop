import { useSelector } from "react-redux";
import { selectAuthUser, selectAuthLoading } from "@/features/auth/api/authSlice";
import { useGetCartQuery } from "@/entities/cart";
import { selectGuestCart } from "@/features/guestCart/guestCartSlice";

export function useCart() {
    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);
    const guestCart = useSelector(selectGuestCart);

    const { data: serverCart = [], isLoading: serverLoading } = useGetCartQuery(undefined, {
        skip: authLoading || !user,
    });

    if (user) {
        return {
            items: serverCart,
            isLoading: authLoading || serverLoading,
            isGuest: false,
        };
    }

    return {
        items: guestCart,
        isLoading: authLoading,
        isGuest: true,
    };
}
