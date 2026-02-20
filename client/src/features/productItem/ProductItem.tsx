import { useState } from "react";
import { Icon } from "../../shared/icons/Icon";
import { Link } from "react-router";
import { navigateRoutes } from "../../shared/config/routes/navigateRoutes";
import type { ProductType } from "./ProductType";
import {
    useAddToCartMutation,
    useGetCartQuery,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
} from "../../entities/cart";
import { AuthAction } from "../../shared/components/AuthAction";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../auth/api/authSlice";
import { toast } from "sonner";

export function ProductItem({ data }: { data: ProductType }) {
    const [filled, setFilled] = useState<boolean>(false);
    const user = useSelector(selectAuthUser);

    const [addToCart] = useAddToCartMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveFromCartMutation();

    const { data: cartItems = [] } = useGetCartQuery(undefined, {
        skip: !user,
    });

    const cartItem = cartItems.find((item) => item.productId?._id === data._id);
    const quantity = cartItem?.quantity ?? 0;

    const handleAdd = async () => {
        await addToCart(data._id);
        toast.success("Додано до кошика!");
    };

    const handleDecrement = () => {
        if (!cartItem) return;
        if (quantity > 1) {
            updateItem({ productId: data._id, quantity: quantity - 1 });
        } else {
            removeItem(data._id);
        }
    };

    const handleIncrement = () => {
        if (!cartItem) return;
        updateItem({ productId: data._id, quantity: quantity + 1 });
    };

    return (
        <div className="bg-white p-5 rounded-[20px]">
            <div className="relative mb-6 last:mb-0">
                {data.label ?
                    <div className="absolute p-2 z-3 top-2.5 py-1 px-2.5 left-4 rounded-[8px] bg-main text-white font-medium text-[14px]">{data.label}</div>
                    : ''
                }
                <Link to={navigateRoutes.navigate.products.getProductById(data._id)} className="relative block pb-[70%]"><img className="absolute-element object-cover rounded-[20px]" src="/footer.png" alt="Image" /></Link>
                <button onClick={() => setFilled(!filled)} className="absolute p-2 z-3 top-2.5 right-4 w-8 h-8 flex justify-center items-center bg-[#f5f5f7] rounded-[8px] cursor-pointer">
                    <Icon name='favorite' className="text-orange-1 transition-colors" filled={filled} />
                </button>
            </div>
            <div>
                <div className="flex justify-between gap-2 mb-5 last:mb-0">
                    <Link to={navigateRoutes.navigate.products.getProductById(data._id)}>
                        <h3 className="section-title-24 hover:text-orange-1 transition-colors">{data.title}</h3>
                    </Link>
                    <div className="text-main text-[18px] font-bold whitespace-nowrap">
                        {data.portionWeightGrams} г
                    </div>
                </div>
                <div className="text-14-gray mb-6 last:mb-0 ">
                    <p>{data.description}</p>
                </div>
                <div className="flex justify-between gap-2 items-center">
                    <div className="text-black text-[18px] font-bold">
                        {data.price} <span className="text-grey"> грн</span>
                    </div>
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
                            <button className="py-1 px-6 bg-orange-1/55 rounded-2xl text-white text-3xl cursor-pointer hover:bg-orange-1/70 transition-colors">+</button>
                        </AuthAction>
                    )}
                </div>
            </div>
        </div>
    )
}
