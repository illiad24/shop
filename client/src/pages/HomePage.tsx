import { IntroSection } from "../widgets/sections/IntroSection";
import { MainSection } from "../widgets/sections/MainSection";
import { MainSlider } from "../widgets/sections/MainSlider";
import { MapSection } from "../widgets/sections/MapSection";

export function HomePage() {
    return (
        <>
            <MainSection />
            <MainSlider title="Охолоджена продукція" data={[{}, {}, {}, {}, {}]} link="Дивитися все" linkUrl="/" />
            <MainSlider title="Охолоджена продукція" data={[{}, {}, {}, {}, {}]} link="Дивитися все" linkUrl="/" />
            <IntroSection />
            <MapSection />
        </>
    )

}