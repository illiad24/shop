import { useGetProductsQuery } from "../entities/product";
import type { ProductType } from "../features/productItem/ProductType";
import { navigateRoutes } from "../shared/config/routes/navigateRoutes";
import { IntroSection } from "../widgets/sections/IntroSection";
import { MainSection } from "../widgets/sections/MainSection";
import { MainSlider } from "../widgets/sections/MainSlider";
import { MapSection } from "../widgets/sections/MapSection";

import { Element } from 'react-scroll';

const sections = [
    {
        title: "Маринована продукція",
        category: "MARINATED",
    },
    {
        title: "Охолоджена продукція",
        category: "CHILLED",
    },
    {
        title: "Снеки",
        category: "SNACKS",
    },
    {
        title: "Заморожена продукція",
        category: "FROZEN",
    },
    {
        title: "Готова продукція",
        category: "READY",
    },
]

export function HomePage() {

    const { data, error, isLoading } = useGetProductsQuery({});
    return (
        <>
            <MainSection />

            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading products.</div>}

            {!isLoading && !error && sections.map(section => {
                const products =
                    data?.filter(
                        (product: ProductType) =>
                            product.category === section.category
                    ) || []

                if (products.length === 0) return null

                return (
                    <Element key={section.category} name={section.category}>
                        <MainSlider

                            title={section.title}
                            data={products}
                            link="Дивитися все"
                            linkUrl={navigateRoutes.navigate.products.list}
                        />
                    </Element>
                )
            })}
            <IntroSection />
            <MapSection />
        </>
    )

}