import { ProductItem } from "../../features/productItem/ProductItem";
import { Icon } from "../../shared/icons/Icon";


interface IMainSliderProps {
    title: string;
    data: any[];
    link?: string;
    linkUrl?: string;
    arrows?: boolean;
}
export function MainSlider({ title, data, link, linkUrl, arrows }: IMainSliderProps) {
    return (
        <section>
            <div className="container">
                <h2 className="mb-10 section-title-32 last:mb-0">{title}</h2>
                <div className="mb-10 last:mb-0">
                    <ProductItem />
                </div>
                <div className="flex justify-between items-center mt-10 last:mt-0 gap-4">
                    <div>
                        {(link && linkUrl) &&
                            <a className="text-main px-8 py-4 rounded-[12px] border border-main inline-block" href={linkUrl}>{link}</a>
                        }
                    </div>
                    <div>
                        {(arrows) &&
                            <div className="flex gap-4 items-center" >
                                <div className="w-12 h-12 rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center rotate-180">
                                    <Icon name="arrow" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center">

                                    <Icon name="arrow" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}