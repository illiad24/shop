import { useGetProductsQuery } from "../../entities/product"
import { ProductItemAdmin } from "../../features/productItem/ProductItemAdmin"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState } from "react";
import { CreateProductDialog } from "../../features/productCreate/ui/CreateProductDialog";
import type { ProductCategory } from "../../features/productItem/ProductType";


export const productCategoryList: {
    value: ProductCategory;
    label: string;
}[] = [
        { value: "CHILLED", label: "Охолоджена продукція" },
        { value: "FROZEN", label: "Заморозка" },
        { value: "READY", label: "Готова продукція" },
        { value: "MARINATED", label: "Маринована продукція" },
        { value: "SNACKS", label: "Снеки" },
    ];

export function AdminProductsPage() {

    const { data, isLoading, error } = useGetProductsQuery()
    const [open, setOpen] = useState(false)
    if (isLoading) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Error loading products</div>
    }
    return (
        <div>
            <div className="flex gap-4 items-center mb-5 last:mb-0">
                <h2 className="section-title-32">Товари</h2>
                <button className="button-element" onClick={() => setOpen(true)}>Створити товар</button>
            </div>
            <Tabs defaultValue="CHILLED">
                <TabsList className="rounded-[12px] bg-white h-auto px-5 py-2.5 mb-8 last:mb-0 flex items-center gap-4 justify-between">
                    {productCategoryList.map(tab => (
                        <TabsTrigger
                            value={tab.value}
                            className="
    text-14-gray rounded-[12px] px-5 py-2 transition-all
    hover:text-main hover:bg-[rgba(12,52,98,0.1)]
    data-[state=active]:text-main
    data-[state=active]:bg-[rgba(12,52,98,0.1)]
  "
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {productCategoryList.map(tab => (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className="grid grid-cols-3 gap-4"
                    >
                        {(() => {
                            const items = data.filter(p => p.category === tab.value)

                            if (items.length === 0) {
                                return (
                                    <div className="col-span-3 text-center text-14-gray py-10">
                                        У цій категорії поки що немає товарів
                                    </div>
                                )
                            }
                            return items.map(p => (
                                <ProductItemAdmin key={p._id} data={p} />
                            ))
                        })()}
                    </TabsContent>
                ))}
            </Tabs>
            <CreateProductDialog
                open={open}
                onOpenChange={setOpen}
            />
        </div>
    )
}