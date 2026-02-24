import { useGetWishlistQuery } from "@/entities/wishlist/api/wishListApi";
import { selectAuthUser } from "@/features/auth/api/authSlice";
import { ProductItem } from "@/features/productItem/ProductItem";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export function Favorite() {
    const user = useSelector(selectAuthUser);

    const { data: wishlist = [], isLoading, isError } = useGetWishlistQuery(undefined, { skip: !user });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Щось пішло не так...</div>
    }
    if (wishlist.length <= 0) {
        return (
            <div className="bg-white p-5 rounded-[12px] flex items-center gap-12 min-h-[300px] max-md:flex-col">
                <div>
                    <img src="/favorite/profile.png" alt="Image" />
                </div>
                <div>
                    <div className="section-title-24 mb-4">
                        У вас ще немає улюблених товарів
                    </div>
                    <div className="text-14-gray text-[16px] mb-4">
                        Додайте сюди товари, щоб повертатися до них
                        знову й знову.
                    </div>
                    <Link to={navigateRoutes.navigate.products.list} className="button-element">Зробити перший лайк</Link>
                </div>
            </div>
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