import { useGetWishlistQuery } from "@/entities/wishlist/api/wishListApi";
import { selectAuthUser, selectAuthLoading } from "@/features/auth/api/authSlice";
import { ProductItem } from "@/features/productItem/ProductItem";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { EmptyFiledInfo } from "./EmptyFiledInfo";

export function Favorite() {
    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);

    const { data: wishlist = [], isLoading, isError } = useGetWishlistQuery(undefined, { skip: authLoading || !user });

    if (authLoading || isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Щось пішло не так...</div>
    }
    if (wishlist.length <= 0) {
        return (
            <EmptyFiledInfo imgSrc='/favorite/profile.png' title='У вас ще немає улюблених товарів' description='Додайте сюди товари, щоб повертатися до них
                знову й знову.' linkText='Зробити перший лайк' linkUrl={navigateRoutes.navigate.products.list} />
        )
    }

    return (
        <div>
            <div className="flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory sm:snap-none">
                {wishlist.map(el => (
                    <div key={el._id} className="snap-start shrink-0 min-w-[70vw] max-md:max-w-[320px] sm:min-w-0">
                        <ProductItem data={el} />
                    </div>
                ))}
            </div>
        </div>
    )
}