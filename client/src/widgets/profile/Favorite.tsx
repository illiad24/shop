import { useGetWishlistQuery } from "@/entities/wishlist/api/wishListApi";
import { selectAuthUser, selectAuthLoading } from "@/features/auth/api/authSlice";
import { ProductItem } from "@/features/productItem/ProductItem";
import { ProductSkeleton } from "@/features/productItem/ProductSkeleton";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useSelector } from "react-redux";
import { EmptyFiledInfo } from "./EmptyFiledInfo";

export function Favorite() {
    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);

    const { data: wishlist = [], isLoading, isError } = useGetWishlistQuery(undefined, {
        skip: authLoading || !user,
    });

    if (authLoading || isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                <p className="text-[#686870]">Не вдалося завантажити список обраних</p>
                <button onClick={() => window.location.reload()} className="button-element">
                    Спробувати знову
                </button>
            </div>
        );
    }

    if (wishlist.length === 0) {
        return (
            <EmptyFiledInfo
                imgSrc='/favorite/profile.png'
                title='У вас ще немає улюблених товарів'
                description='Додайте сюди товари, щоб повертатися до них знову й знову.'
                linkText='Зробити перший лайк'
                linkUrl={navigateRoutes.navigate.products.list}
            />
        );
    }

    return (
        <div className="flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory sm:snap-none">
            {wishlist.map(el => (
                <div key={el._id} className="snap-start shrink-0 min-w-[70vw] max-md:max-w-[320px] sm:min-w-0">
                    <ProductItem data={el} />
                </div>
            ))}
        </div>
    );
}
