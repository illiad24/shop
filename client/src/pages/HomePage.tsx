import { useGetProductsQuery } from "../entities/product";
import type { ProductType } from "../features/productItem/ProductType";
import { navigateRoutes } from "../shared/config/routes/navigateRoutes";
import { IntroSection } from "../widgets/sections/IntroSection";
import { MainSection } from "../widgets/sections/MainSection";
import { MainSlider } from "../widgets/sections/MainSlider";
import { MapSection } from "../widgets/sections/MapSection";

export function HomePage() {

    const { data, error, isLoading } = useGetProductsQuery();

    const marinatedProducts = data?.filter((product: ProductType) => product.category === 'MARINATED') || [];


    return (
        <>
            <MainSection />
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error loading products.</div>
            ) : marinatedProducts.length > 0 ? (
                <MainSlider
                    title="Маринована продукція"
                    data={marinatedProducts}
                    link="Дивитися все"
                    linkUrl={navigateRoutes.navigate.products.list}
                />
            ) : null}
            <IntroSection />
            <MapSection />
        </>
    )

}