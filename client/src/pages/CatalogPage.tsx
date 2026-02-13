import { useEffect, useRef, useState } from "react"
import { useGetProductsQuery } from "../entities/product"
import { ProductItem } from "../features/productItem/ProductItem"
import { Icon } from "../shared/icons/Icon"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { validators } from "tailwind-merge"
import { useFiltersFromURL } from "../shared/hooks/useFiltersFromURL"
import { selectCategory } from "../features/category/category.slice"
import { useSelector } from "react-redux"

export interface IProductsFilter {
    search?: string;
    category?: ProductCategory;
    sort?: "price_asc" | "price_desc";
}


export function CatalogPage() {
    const { filters, setFilter } = useFiltersFromURL()
    const { data, isLoading, error } = useGetProductsQuery(filters)
    const [open, setOpen] = useState(false);

    const inputRef = useRef(null);

    const categoryType = useSelector((state) => state.category.selectedCategory)

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);
    useEffect(() => {
        if (categoryType) {
            setFilter('category', categoryType)
        }
    }, [categoryType]);
    const handleClick = () => {
        setOpen(!open);
        console.log(inputRef)
        setTimeout(() => {
            inputRef.current?.focus();
        }, 300);
    };


    return (
        <>
            <div className="pb-10 pt-50">
                <div className="container">
                    <div className="flex justify-between gap-5">
                        <div className="flex gap-5 mb-9 last:mb-0">
                            <h1 className="section-title-32">
                                Product
                            </h1>

                            <div className="flex items-center relative">
                                <div
                                    onClick={handleClick}
                                    className="bg-white text-[#686870] text-2xl rounded-[12px] py-3 px-4 cursor-pointer"
                                >
                                    <Icon name="search" />
                                </div>

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={filters?.search || ""}
                                    onChange={(e) => setFilter("search", e.target.value)}
                                    placeholder="Search..."
                                    className={`
          transition-all duration-300 ease-in-out
          bg-white  rounded-[12px]
          py-3 px-4 text-[#686870]
          ${open ? "w-64 opacity-100 ml-3" : "w-0 opacity-0 p-0 border-0"}
          overflow-hidden
        `}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">

                            <div>
                                <Select
                                    value={filters?.sort || ""}
                                    onValueChange={(value: string) => setFilter("sort", value)}
                                >
                                    <SelectTrigger className="bg-white rounded-[12px] w-[220px]">
                                        <SelectValue value='' placeholder="Сортувати за" />
                                    </SelectTrigger>

                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectItem value="price_asc">Ціна: від дешевих</SelectItem>
                                            <SelectItem value="price_desc">Ціна: від дорогих</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Error loading products.</div>}
                        <div className="grid grid-cols-3 gap-5">
                            {!isLoading && !error && data.map(el =>
                                <ProductItem key={el._id} data={el} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}