import { ProductItem } from "../../features/productItem/ProductItem";
import { Icon } from "../../shared/icons/Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef, useState } from "react";

interface IMainSliderProps {
    title: string;
    data: any[];
    link?: string;
    linkUrl?: string;
    arrows?: boolean;
}

export function MainSlider({ title, data, link, linkUrl, arrows }: IMainSliderProps) {
    const [prevEl, setPrevEl] = useState < HTMLButtonElement | null > (null);
    const [nextEl, setNextEl] = useState < HTMLButtonElement | null > (null);

    return (
        <section>
            <div className="container">
                <h2 className="mb-10 section-title-32 last:mb-0">{title}</h2>
                <div className="mb-10 last:mb-0">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation={{
                            prevEl,
                            nextEl,
                        }}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                                swiper.params.navigation.prevEl = prevEl;
                                swiper.params.navigation.nextEl = nextEl;
                            }
                        }}
                        breakpoints={{

                        }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ProductItem {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="flex justify-between items-center mt-10 last:mt-0 gap-4">
                    {link && linkUrl && (
                        <a
                            className="text-main px-8 py-4 rounded-[12px] border border-main inline-block"
                            href={linkUrl}
                        >
                            {link}
                        </a>
                    )}

                    <div className="flex gap-4 items-center">
                        <button
                            ref={(node) => setPrevEl(node)}
                            className="w-12 h-12 rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center rotate-180"
                        >
                            <Icon name="arrow" />
                        </button>
                        <button
                            ref={(node) => setNextEl(node)}
                            className="w-12 h-12 rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center"
                        >
                            <Icon name="arrow" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
