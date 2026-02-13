import { useState } from "react";
import { Icon } from "../../shared/icons/Icon";
import { Link } from "react-router";
import { navigateRoutes } from "../../shared/config/routes/navigateRoutes";
import type { ProductType } from "./ProductType";
import { useDeleteProductMutation } from "../../entities/product";
import { CreateProductDialog } from "../productCreate/ui/CreateProductDialog";



export function ProductItemAdmin({ data }: { data: ProductType }) {
    const [deleteProduct] = useDeleteProductMutation()
    const [open, setOpen] = useState(false)
    async function onDelete(id) {
        try {
            await deleteProduct(id)
            alert('product deleted')
        } catch (error) {
            console.log(error)
        }
    }

    function onEdit() {
        setOpen(true)
    }

    return (
        <>
            <div className="bg-white p-5 rounded-[20px]">
                <div className="relative mb-6 last:mb-0">
                    {data.label ?

                        <div className="absolute p-2 z-3 top-2.5 py-1 px-2.5 left-4 rounded-[8px] bg-main text-white font-medium text-[14px]">{data.label}</div>
                        : ''
                    }
                    <Link to={navigateRoutes.navigate.products.getProductById(data._id)} className="relative block pb-[70%]"><img className="absolute-element object-cover rounded-[20px]" src="/about/history/01.png" alt="Image" /></Link>
                    <div className="absolute  z-3 top-2.5 right-4 flex gap-2 rounded-[8px] bg-white">
                        <button onClick={() => onEdit()} className="p-2 w-8 h-8 flex justify-center items-center cursor-pointer">
                            <Icon name='edit' className="text-orange-1 transition-colors" />
                        </button>
                        <button onClick={() => onDelete(data._id)} className="p-2 w-8 h-8 flex justify-center items-center  cursor-pointer">
                            <Icon name='delete' className="text-orange-1 transition-colors" />
                        </button>
                    </div>
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
                            {data.price} <span className="text-grey"> грн</span></div>
                    </div>
                </div>
            </div>
            <CreateProductDialog
                id={data._id}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    )
}