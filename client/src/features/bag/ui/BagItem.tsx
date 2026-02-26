import { useRemoveFromCartMutation, useUpdateCartItemMutation } from "@/entities/cart";
import { Icon } from "@/shared/icons/Icon";

export function BagItem({ item }) {
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveFromCartMutation();
    return (
        <div className="flex items-center gap-2 p-3 bg-[#f5f5f7] rounded-[12px]">
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-black text-[14px] mb-0.5 truncate">
                    {item.productId.title}
                </div>
                <div className="text-[12px] text-orange-1">
                    {item.productId.portionWeightGrams} г / {item.productId.countPerPortion} шт
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <span className="text-black font-bold text-[13px] whitespace-nowrap">
                    {item.productId.price} грн
                </span>
                <button
                    type="button"
                    onClick={() => updateItem({ productId: item.productId._id, quantity: item.quantity - 1 })}
                    className="w-7 h-7 flex items-center justify-center text-white bg-orange-1 rounded-[7px] hover:bg-orange-1/80 transition-colors font-bold"
                >
                    −
                </button>
                <span className="text-black font-bold text-[14px] w-5 text-center">
                    {item.quantity}
                </span>
                <button
                    type="button"
                    onClick={() => updateItem({ productId: item.productId._id, quantity: item.quantity + 1 })}
                    className="w-7 h-7 flex items-center justify-center text-white bg-orange-1 rounded-[7px] hover:bg-orange-1/80 transition-colors font-bold"
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={() => removeItem(item.productId._id)}
                    className="text-[#d2d2d7] hover:text-orange-1 transition-colors"
                >
                    <Icon name="close" />
                </button>
            </div>
        </div>
    )
}