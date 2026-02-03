import { Swiper, SwiperSlide } from "swiper/react";
import {
    EffectFade, Autoplay
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export function MainSection() {
    return (
        <section className="relative mb-15  ">
            <Swiper
                modules={[EffectFade, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                effect={'fade'}
                speed={1200}
            >
                <SwiperSlide className="relative min-h-[100vh] flex items-center content-center pt-20">
                    <img className="absolute-element object-cover" src="/homepage/main/01.png" alt="Свіжі морепродукти" />
                    <div className="container relative z-40 h-full " >
                        <div>
                            <div className="max-w-[700px]">
                                <h1 className="font-bold text-[64px] text-main mb-8 last:mb-0">Смакуйте свіжість океану</h1>
                                <div className="text-main text-[18px] mb-10 last:mb-0">
                                    <p>
                                        Відкрийте для себе неперевершений смак свіжих морепродуктів, доставлених прямо до вашого столу.
                                    </p>
                                </div>
                                <a href="/products" className="button-el">Переглянути асортимент</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative min-h-[100vh] flex items-center content-center pt-20">
                    <img className="absolute-element object-cover" src="/homepage/main/02.png" alt="Вишукані делікатеси" />
                    <div className="container relative z-40 h-full " >
                        <div>
                            <div className="max-w-[700px]">
                                <h1 className="font-bold text-[64px] text-main mb-8 last:mb-0">Вишукані делікатеси для гурманів</h1>
                                <div className="text-main text-[18px] mb-10 last:mb-0">
                                    <p>
                                        Зануртесь у світ неперевершених смаків з нашою колекцією відбірних морських делікатесів.
                                    </p>
                                </div>
                                <a href="/delicacies" className="button-el">Відкрити для себе</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative min-h-[100vh] flex items-center content-center pt-20">
                    <img className="absolute-element" src="/homepage/main/01.png" alt="Кулінарна досконалість" />
                    <div className="container relative z-40 h-full" >
                        <div>
                            <div className="max-w-[700px]">
                                <h1 className="font-bold text-[64px] text-main mb-8 last:mb-0">Кулінарна досконалість на вашому столі</h1>
                                <div className="text-main text-[18px] mb-10 last:mb-0">
                                    <p>
                                        Створіть незабутні страви з нашими преміальними морепродуктами, які надихають на кулінарні шедеври.
                                    </p>
                                </div>
                                <a href="/recipes" className="button-el">Знайти рецепти</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}