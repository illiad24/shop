import { useParams } from "react-router";
import { useGetProductsQuery } from "../entities/product";
import { navigateRoutes } from "../shared/config/routes/navigateRoutes";
import { Icon } from "../shared/icons/Icon";
import { MainSlider } from "../widgets/sections/MainSlider";
import type { ProductType } from "../features/productItem/ProductType";

export function ProductDetailsPage() {
    const { id } = useParams();
    const { data = [], error, isLoading } = useGetProductsQuery({});

    if (isLoading) {
        return <div className="container pt-3 pb-15">Loading...</div>;
    }

    if (error) {
        return <div className="container pt-3 pb-15">Error loading product.</div>;
    }

    const product = data.find((item: ProductType) => item._id === id);

    if (!product) {
        return <div className="container pt-3 pb-15">Product not found</div>;
    }
    return (
        <div className="container pt-3 pb-15 md:pt-50">
            <div className="flex gap-5 md:gap-15 items-start md:items-center flex-col md:flex-row mb-23 last:mb-0">
                <div className="relative bg-[#939393] w-full rounded-2xl flex-[50%] shrink-0 grow-0 pb-[60%] md:pb-[33%] ">

                </div>
                <div className="flex-auto md:flex-[50%] shrink-0 grow-0">
                    <div className=" p-2 z-3 inline-block py-1 px-2.5  rounded-[8px] bg-main text-white font-medium text-[14px] mb-3 last:mb-0">
                        Новинка
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
                            {product.price}pl
                        </div>
                        <div className="flex items-center gap-2.5">
                            <button className="flex items-center gap-2 bg-orange-1  text-2xl  text-white px-6 py-2 rounded-[12px]">
                                <span>Кошик</span>
                                <Icon name='bag' />
                            </button>
                            <button className="text-[24px] text-orange-1 p-3 rounded-[12px] bg-white">
                                <Icon name='favorite' className='text-[20px]' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error loading products.</div>
            ) : data.length > 0 ? (
                <MainSlider
                    title="Рекомендована продукція"
                    data={data}
                    link="Дивитися все"
                    linkUrl={navigateRoutes.navigate.products.list}
                />
            ) : null}
        </div>

    )
}