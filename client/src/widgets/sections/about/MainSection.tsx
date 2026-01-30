export function MainSection() {
    return (
        <section className="py-15">
            <div className="container bg-[#fff] rounded-4xl flex gap-10 flex-col sm:flex-row justify-between items-center relative overflow-hidden">
                <img className="absolute-element pointer-events-none" src="/about/main/decor.png" alt="Image" />
                <div className="p-10">
                    <h2 className="section-title-32 mb-10 last:mb-0 text-orange-1">Про нас</h2>
                    <div className="text-[#454547] ">
                        Серце Океану — це сімейний бізнес, створений на основі поваги до традицій та віри в те, що їжа об’єднує людей. Для нас особливо цінні моменти, коли вся родина збирається за одним столом. Ми віримо, що якісні морепродукти здатні подарувати близьким радість, тепло та смак справжнього свята.
                    </div>
                </div>
                <div className="relative aspect-square max-w-490 min-h-auto w-full md:min-h-[490px]">
                    <img src="/about/main/01.png" alt="Image" className="absolute-element object-cover rounded-3xl" />
                </div>
            </div>
        </section>
    )
}