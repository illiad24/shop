import { useParams } from "react-router";
import { useGetProductsQuery } from "../entities/product";
import { navigateRoutes } from "../shared/config/routes/navigateRoutes";
import { Icon } from "../shared/icons/Icon";
import { MainSlider } from "../widgets/sections/MainSlider";
import type { ProductType } from "../features/productItem/ProductType";
import { useGetWishlistQuery, useToggleWishlistMutation } from "@/entities/wishlist/api/wishListApi";
import { selectAuthUser, selectAuthLoading } from "@/features/auth/api/authSlice";
import { useSelector } from "react-redux";
import { useAddToCartMutation, useGetCartQuery, useRemoveFromCartMutation, useUpdateCartItemMutation } from "@/entities/cart";
import { AuthAction } from "@/shared/components/AuthAction";
import { toast } from "sonner";

export function ProductDetailsPage() {
    const { id } = useParams();
    const { data = [], error, isLoading } = useGetProductsQuery({});

    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);

    const { data: wishlist = [] } = useGetWishlistQuery(undefined, { skip: authLoading || !user });
    const product = data.find((item: ProductType) => item._id === id);
    const inWishlist = wishlist.some((p) => p._id === product?._id);

    const [toggleWishlist] = useToggleWishlistMutation();

    async function addToFavorite(id: string) {
        try {
            await toggleWishlist(id);
        } catch (error) {
            console.log(error);
        }
    }

    const [addToCart] = useAddToCartMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveFromCartMutation();

    const { data: cartItems = [] } = useGetCartQuery(undefined, { skip: authLoading || !user });

    const cartItem = cartItems.find((item) => item.productId?._id === product?._id);
    const quantity = cartItem?.quantity ?? 0;

    const handleAdd = async () => {
        if (!product) return;
        await addToCart(product._id);
        toast.success("Додано до кошика!");
    };

    const handleDecrement = () => {
        if (!cartItem || !product) return;
        if (quantity > 1) {
            updateItem({ productId: product._id, quantity: quantity - 1 });
        } else {
            removeItem(product._id);
        }
    };

    const handleIncrement = () => {
        if (!cartItem || !product) return;
        updateItem({ productId: product._id, quantity: quantity + 1 });
    };

    if (isLoading) return <div className="container pt-3 pb-15">Loading...</div>;
    if (error) return <div className="container pt-3 pb-15">Error loading product.</div>;
    if (!product) return <div className="container pt-3 pb-15">Product not found</div>;

    return (
        <div className="container pt-3 pb-15 md:pt-50">
            <div className="flex gap-5 md:gap-15 items-start md:items-center flex-col md:flex-row mb-23 last:mb-0">

                {/* image */}
                <div className="relative bg-[#939393] w-full rounded-2xl overflow-hidden flex-[50%] shrink-0 grow-0 pb-[60%] md:pb-[33%]">
                    <img
                        src={product.image || "/footer.png"}
                        alt="Image"
                        className="absolute-element object-cover"
                    />
                </div>

                {/* info */}
                <div className="flex-auto md:flex-[50%] shrink-0 grow-0">
                    <div className="p-2 z-3 inline-block py-1 px-2.5 rounded-[8px] bg-main text-white font-medium text-[14px] mb-3 last:mb-0">
                        {product.label}
                    </div>

                    <div className="section-title-32 text-2xl md:text-[48px]">
                        {product.title}
                    </div>

                    <div className="text-main text-2xl mb-7 last:mb-0">
                        {product.portionWeightGrams} г
                    </div>

                    <div className="text-14-gray text-[16px] mb-7 last:mb-0">
                        {product.description}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="section-title-32">
                            {product.price} грн
                        </div>

                        <div className="flex items-center gap-2.5">
                            {quantity > 0 ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleDecrement}
                                        className="w-8 h-8 flex items-center justify-center bg-[#f5f5f7] rounded-[8px] border border-[#d2d2d7] hover:border-orange-1 transition-colors font-bold cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="text-[14px] font-semibold w-5 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={handleIncrement}
                                        className="w-8 h-8 flex items-center justify-center bg-orange-1/55 rounded-[8px] text-white hover:bg-orange-1/70 transition-colors font-bold cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <AuthAction onAction={handleAdd}>
                                    <button className="flex items-center gap-2 bg-orange-1 button-element text-2xl text-white px-6 py-2 rounded-[12px]">
                                        <span>Кошик</span>
                                        <Icon name="bag" />
                                    </button>
                                </AuthAction>
                            )}
                        </div>

                        <button
                            onClick={() => addToFavorite(product._id)}
                            className="text-[24px] cursor-pointer text-orange-1 p-3 rounded-[12px] hover:bg-[#e5e5e5] transition-all bg-white"
                        >
                            <Icon name="favorite" filled={inWishlist} className="text-[20px]" />
                        </button>
                    </div>
                </div>
            </div>

            {!isLoading && !error && data.length > 0 && (
                <MainSlider
                    title="Рекомендована продукція"
                    data={data}
                    link="Дивитися все"
                    linkUrl={navigateRoutes.navigate.products.list}
                />
            )}
        </div>
    );
}
