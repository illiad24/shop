import { useEffect, useRef, useState, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";

import { useGetProductsQuery } from "../entities/product";
import { ProductItem } from "../features/productItem/ProductItem";
import { Icon } from "../shared/icons/Icon";
import { useFiltersFromURL } from "../shared/hooks/useFiltersFromURL";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { productCategoryList } from "./admin/AdminProductsPage";
import { selectCategory } from "@/features/category/category.slice";

export interface IProductsFilter {
    search?: string;
    category?: string;
    sort?: "price_asc" | "price_desc";
}

export function CatalogPage() {
    const { filters, setFilter, clearFilters } = useFiltersFromURL();
    const [open, setOpen] = useState(false);
    const inputRef = useRef < HTMLInputElement > (null);
    const dispatch = useDispatch();

    const hasActiveFilters = !!(filters?.search || filters?.sort || filters?.category);

    const handleClearFilters = () => {
        clearFilters();
        dispatch(selectCategory(""));
        setOpen(false);
    };

    // Debounce search input
    const [debouncedSearch] = useDebounce(filters?.search, 500);

    // Sync Redux category
    const categoryType = useSelector(
        (state: any) => state.category.selectedCategory
    );

    useEffect(() => {
        if (categoryType && categoryType !== filters?.category) {
            setFilter("category", categoryType);
        }
    }, [categoryType, filters?.category, setFilter]);

    // Stable query filters
    const queryFilters = useMemo(() => {
        if (!filters) return skipToken;

        return {
            ...filters,
            search: debouncedSearch || undefined,
        };
    }, [filters, debouncedSearch]);

    const { data, isLoading, isFetching, error } = useGetProductsQuery(queryFilters);

    // Focus input when search opens
    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    const handleSearchToggle = () => {
        setOpen((prev) => !prev);
        if (open && filters?.search) {
            setFilter("search", "");
        }
    };

    const showInitialLoader = isLoading;
    const showFetchingLoader = isFetching && data;

    return (
        <div className="pb-10  pt-2 md:pt-50">
            <div className="container">
                <div className="flex justify-between gap-5 mb-9 flex-col md:flex-row w-full">
                    <div className="flex gap-5 items-center">
                        <h1 className="section-title-32 hidden md:block"> {
                            productCategoryList.find(el => el.value === categoryType)?.label
                            ?? (categoryType ? '' : 'продукти')
                        }</h1>

                        <div className="flex items-center shrink-1 grow-1">
                            <button
                                onClick={handleSearchToggle}
                                className="bg-white text-[#686870] text-2xl rounded-none md:rounded-[12px] py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                aria-label="Пошук"
                            >
                                <Icon name="search" />
                            </button>

                            <input
                                ref={inputRef}
                                type="text"
                                value={filters?.search || ""}
                                onChange={(e) =>
                                    setFilter("search", e.target.value)
                                }
                                placeholder="Пошук..."
                                className={`
                                    transition-all duration-300 ease-in-out
                                    bg-white rounded-none md:rounded-[12px]
                                    py-3 px-4 text-[#686870]
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${open
                                        ? "md:w-64 md:opacity-100 md:ml-3"
                                        : "md:w-0 md:opacity-0 md:ml-0 md:p-0 md:border-0"
                                    }
                                    w-full
                                    overflow-hidden
                                `}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <Select
                            value={filters?.sort || ""}
                            onValueChange={(value) =>
                                setFilter("sort", value)
                            }
                        >
                            <SelectTrigger className="bg-white rounded-[12px]   className='w-full md:w-auto'">
                                <SelectValue placeholder="Сортувати за" />
                            </SelectTrigger>

                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectItem value="price_asc">
                                        Ціна: від дешевих
                                    </SelectItem>
                                    <SelectItem value="price_desc">
                                        Ціна: від дорогих
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 mb-6 -mt-3">
                        {filters?.category && (
                            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 text-[13px] font-medium px-3 py-1.5 rounded-full">
                                {productCategoryList.find(c => c.value === filters.category)?.label ?? filters.category}
                                <button onClick={() => { setFilter("category", ""); dispatch(selectCategory("")); }} className="hover:text-orange-700 transition-colors">
                                    <Icon name="close" size={12} />
                                </button>
                            </span>
                        )}
                        {filters?.sort && (
                            <span className="flex items-center gap-1.5 bg-[#f5f5f7] text-[#686870] text-[13px] font-medium px-3 py-1.5 rounded-full">
                                {filters.sort === "price_asc" ? "Ціна: від дешевих" : "Ціна: від дорогих"}
                                <button onClick={() => setFilter("sort", "")} className="hover:text-gray-900 transition-colors">
                                    <Icon name="close" size={12} />
                                </button>
                            </span>
                        )}
                        {filters?.search && (
                            <span className="flex items-center gap-1.5 bg-[#f5f5f7] text-[#686870] text-[13px] font-medium px-3 py-1.5 rounded-full">
                                «{filters.search}»
                                <button onClick={() => { setFilter("search", ""); setOpen(false); }} className="hover:text-gray-900 transition-colors">
                                    <Icon name="close" size={12} />
                                </button>
                            </span>
                        )}
                        <button
                            onClick={handleClearFilters}
                            className="text-[13px] text-[#686870] hover:text-orange-1 transition-colors ml-1"
                        >
                            Скинути все
                        </button>
                    </div>
                )}

                <div className="relative min-h-[400px]">
                    {showInitialLoader && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-lg text-gray-600">
                                Завантаження...
                            </div>
                        </div>
                    )}

                    {showFetchingLoader && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                            <div className="text-lg text-gray-600">
                                Завантаження...
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-10 text-red-600">
                            Помилка завантаження продуктів.
                        </div>
                    )}

                    {!error && !isLoading && data && data.length === 0 && (
                        <div className="text-center py-10 text-gray-600">
                            Продукти не знайдено
                        </div>
                    )}

                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${showFetchingLoader ? 'opacity-50' : ''}`}>
                        {!isLoading && !error && data?.map((el: any) => (
                            <ProductItem key={el._id} data={el} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}