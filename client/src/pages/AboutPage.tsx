import { HistorySection } from "../widgets/sections/about/HistorySection";
import { MainSection } from "../widgets/sections/about/MainSection";
import { ValuesSection } from "../widgets/sections/about/ValuesSection";


export function AboutPage() {
    return (
        <>
            <div className="pt-3 pb-15 md:pt-50">
                <MainSection />
                <ValuesSection />
                <HistorySection />
            </div>
        </>
    )
}