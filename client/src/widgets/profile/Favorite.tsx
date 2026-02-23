import { useGetWishlistQuery } from "@/entities/wishlist/api/wishListApi";
import { selectAuthUser } from "@/features/auth/api/authSlice";
import { ProductItem } from "@/features/productItem/ProductItem";
import { useSelector } from "react-redux";

export function Favorite() {
    const user = useSelector(selectAuthUser);
    const { data: wishlist = [], isLoading, isError } = useGetWishlistQuery(undefined, { skip: !user });


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Щось пішло не так...</div>
    }
    return (
        <div className="grid grid-cols-2 gap-4">
            {wishlist.map(el => (
                <ProductItem key={el._id} data={el} />
            ))}
        </div>
    )
}