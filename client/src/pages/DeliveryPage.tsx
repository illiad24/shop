import { DeliverySection } from "../widgets/sections/DeliverySection";
import { MapSection } from "../widgets/sections/MapSection";

export function DeliveryPage() {
    return (
        <div className="pt-3 pb-15 md:pt-50">

            <DeliverySection />
            <MapSection />
        </div>

    )

}