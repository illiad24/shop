import { IntroSection } from "../widgets/sections/IntroSection";
import { MainSlider } from "../widgets/sections/MainSlider";
import { MapSection } from "../widgets/sections/MapSection";

export function HomePage() {
    return (
        <>
            <MainSlider title="Охолоджена продукція" data={[{}, {}, {}, {}, {}]} link="Дивитися все" linkUrl="/" arrows={true} />
            <IntroSection />
            <MapSection />
        </>
    )

}