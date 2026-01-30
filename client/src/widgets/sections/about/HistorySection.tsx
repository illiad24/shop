import { ContentItem } from "../../../features/components/ContentItem";

export function HistorySection() {
    return (
        <section className="py-15">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-start items-start">
                    <div>
                        <h2 className="section-title-32 mb-10 last:mb-0 ">Наша <span className="text-orange-1">історія</span></h2>
                        <div className="text-[#454547] mb-10 last:mb-0">
                            <p>
                                Довіра та відкритість
                                <br />
                                <br />
                                Чесність у роботі та прозорість у кожній деталі — основа наших відносин із клієнтами.
                                <br /><br />
                                Тоді ми вирішили зробити крок самі: знайти і привезти ті продукти, які нагадують про дім. Спочатку лише для себе, а згодом — і для інших. Виявилося, що нас багато — тих, хто хоче відчути затишок і свято за власним столом.
                                Так почалася наша історія. Сьогодні ми пропонуємо не тільки улюблені продукти з дитинства, але й свіжу рибу та морепродукти, щоб кожна родина могла додати до свого столу різноманіття, смак і трішки радості.
                            </p>
                        </div>
                        <div className="flex">
                            <div className="max-w-[240px]">
                                <div className="mb-5 last:mb-0 section-title-32">
                                    42 000+
                                </div>
                                <div className="text-14-gray">
                                    В Польщі вже відчули тепло та любов завдяки нашим продуктам.
                                </div>
                            </div>
                            <div className="max-w-[240px]">
                                <div className="mb-5 last:mb-0 section-title-32">
                                    4.02.2025
                                </div>
                                <div className="text-14-gray">
                                    Саме цього дня ми розпочали свій шлях.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid  gap-4 w-full grid-cols-1 sm:grid-cols-2">
                        <div className="relative pb-[90%] sm:pb-[190%]">
                            <img src="/about/history/01.png" className="absolute-element object-cover rounded-3xl" alt="Image" />
                        </div>
                        <div>
                            <div className="mb-5 last:mb-0 relative pb-[90%]">
                                <img src="/about/history/02.png" className="absolute-element object-cover   rounded-3xl" alt="Image" />
                            </div>
                            <div className="relative pb-[90%]">
                                <img src="/about/history/03.png" className="absolute-element object-cover rounded-3xl" alt="Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}