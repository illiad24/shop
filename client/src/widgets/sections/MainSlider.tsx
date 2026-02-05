import { ProductItem } from "../../features/productItem/ProductItem";
import { Icon } from "../../shared/icons/Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from "react";
import type { ProductType } from "../../features/productItem/ProductType";


interface IMainSliderProps {
    title: string;
    data: any[];
    link?: string;
    linkUrl?: string;
    arrows?: boolean;
}

export function MainSlider({ title, data, link, linkUrl }: IMainSliderProps) {
    const [prevEl, setPrevEl] = useState < HTMLButtonElement | null > (null);
    const [nextEl, setNextEl] = useState < HTMLButtonElement | null > (null);

    return (
        <section className="py-15">
            <div className="container">
                <h2 className="mb-10 section-title-32 last:mb-0">{title}</h2>
                <div className="mb-10 last:mb-0">
                    <Swiper
                        className="!overflow-visible"
                        wrapperClass=""
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={3}
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
                            240: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1280: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ProductItem {...item} data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="flex justify-between  mt-10 last:mt-0 gap-4">
                    {link && linkUrl && (
                        <a
                            className="text-main text-[18px] px-8 py-3 rounded-[12px] font-bold border border-main inline-block hover:bg-main/10 transition-colors"
                            href={linkUrl}
                        >
                            {link}
                        </a>
                    )}

                    <div className="hidden gap-4 items-center sm:flex">
                        <button
                            ref={(node) => setPrevEl(node)}
                            className="w-12 h-12 font-bold rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center rotate-180 hover:bg-orange-1/10 transition-colors [&.swiper-button-disabled]:opacity-50
    [&.swiper-button-disabled]:cursor-not-allowed
    [&.swiper-button-disabled]:hover:bg-transparent"
                        >
                            <Icon name="arrow" />
                        </button>
                        <button
                            ref={(node) => setNextEl(node)}
                            className="w-12 h-12 font-bold rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center  hover:bg-orange-1/10 transition-colors [&.swiper-button-disabled]:opacity-50
    [&.swiper-button-disabled]:cursor-not-allowed
    [&.swiper-button-disabled]:hover:bg-transparent"
                        >
                            <Icon name="arrow" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
