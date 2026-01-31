import { ProductItem } from "../../features/productItem/ProductItem";
import { Icon } from "../../shared/icons/Icon";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from "react";

interface IMainSliderProps {
    title: string;
    data: any[];
    link?: string;
    linkUrl?: string;
    arrows?: boolean;
}

export function MainSlider({ title, data, link, linkUrl, arrows }: IMainSliderProps) {
    const prevRef = useRef < HTMLButtonElement | null > (null);
    const nextRef = useRef < HTMLButtonElement | null > (null);
    const swiperRef = useRef < any > (null);

    return (
        <section>
            <div className="container">
                <h2 className="mb-10 section-title-32 last:mb-0">{title}</h2>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        console.log(1)
                        console.log(arrows, prevRef.current, nextRef.current)
                        if (arrows && prevRef.current && nextRef.current) {
                            console.log(2)
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;

                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ProductItem {...item} />
                        </SwiperSlide>
                    ))}
                </Swiper>

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
                            ref={prevRef}
                            className="w-12 h-12 rounded-2xl border border-orange-1 text-orange-1 flex justify-center items-center rotate-180"
                        >
                            <Icon name="arrow" />
                        </button>
                        <button
                            ref={nextRef}
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
