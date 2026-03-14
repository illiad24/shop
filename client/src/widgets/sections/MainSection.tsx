import { Swiper, SwiperSlide } from "swiper/react";
import {
    EffectFade, Autoplay
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { useTranslation } from 'react-i18next';
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { Link } from "react-router";


export function MainSection() {
    const { t, i18n } = useTranslation();

    return (
        <section className="relative mb-15  ">
            <Swiper
                modules={[EffectFade, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                // autoplay={{ delay: 5000 }}
                effect={'fade'}
                speed={1200}
            >
                <SwiperSlide className="relative min-h-svh max-md:min-h-[500px] flex items-center content-center pt-20">
                    <img className="absolute-element object-cover" src="/homepage/main/01.png" alt="Свіжі морепродукти" />
                    <div className="container relative z-40 h-full">
                        <div>
                            <div className="max-w-[700px] ">
                                <h1>{t('home.title')}</h1>
                                <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] text-main mb-4 sm:mb-8 last:mb-0">Смакуйте свіжість океану</h1>
                                <div className="text-main text-[16px] sm:text-[18px] mb-6 sm:mb-10 last:mb-0">
                                    <p>
                                        Відкрийте для себе неперевершений смак свіжих морепродуктів, доставлених прямо до вашого столу.
                                    </p>
                                </div>
                                <Link to={navigateRoutes.navigate.products.list} className="text-[16px] sm:text-[20px] inline-block text-white bg-orange-1 rounded-xl px-5 py-3 hover:bg-orange-1/50 transition-all">Переглянути асортимент</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative min-h-svh  max-md:min-h-[500px] flex items-center content-center pt-20">
                    <img className="absolute-element object-cover" src="/homepage/main/02.png" alt="Вишукані делікатеси" />
                    <div className="container relative z-40 h-full">
                        <div>
                            <div className="max-w-[700px]">
                                <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] text-main mb-4 sm:mb-8 last:mb-0">Вишукані делікатеси для гурманів</h1>
                                <div className="text-main text-[16px] sm:text-[18px] mb-6 sm:mb-10 last:mb-0">
                                    <p>
                                        Зануртесь у світ неперевершених смаків з нашою колекцією відбірних морських делікатесів.
                                    </p>
                                </div>
                                <Link to={navigateRoutes.navigate.products.list} className="text-[16px] sm:text-[20px] inline-block text-white bg-orange-1 rounded-xl px-5 py-3 hover:bg-orange-1/50 transition-all">Відкрити для себе</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative min-h-svh max-md:min-h-[500px] flex items-center content-center pt-20">
                    <img className="absolute-element object-cover" src="/homepage/main/01.png" alt="Кулінарна досконалість" />
                    <div className="container relative z-40 h-full">
                        <div>
                            <div className="max-w-[700px]">
                                <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[64px] text-main mb-4 sm:mb-8 last:mb-0">Кулінарна досконалість на вашому столі</h1>
                                <div className="text-main text-[16px] sm:text-[18px] mb-6 sm:mb-10 last:mb-0">
                                    <p>
                                        Створіть незабутні страви з нашими преміальними морепродуктами, які надихають на кулінарні шедеври.
                                    </p>
                                </div>
                                <Link to={navigateRoutes.navigate.products.list} className="text-[16px] sm:text-[20px] inline-block text-white bg-orange-1 rounded-xl px-5 py-3 hover:bg-orange-1/50 transition-all">Знайти рецепти</Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}