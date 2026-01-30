import { HistorySection } from "../widgets/sections/about/HistorySection";
import { MainSection } from "../widgets/sections/about/MainSection";
import { ValuesSection } from "../widgets/sections/about/ValuesSection";
import { IntroSection } from "../widgets/sections/IntroSection";


export function AboutPage() {
    return (
        <>
            <div>
                <MainSection />
                <ValuesSection />
                <HistorySection />
            </div>
        </>
    )

}