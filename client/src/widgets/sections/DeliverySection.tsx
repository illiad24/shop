import { ContentItem } from "../../features/components/ContentItem";

export function DeliverySection() {
    return (
        <section>
            <div className="container py-15">
                <h2 className="section-title-32 mb-10 last:mb-0 text-orange-1">Доставка</h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
                    <ContentItem imgSrc='./delivery/01.png' title='Зона доставки' description='Ми відправляємо замовлення по всій Польщі' />
                    <ContentItem imgSrc='./delivery/02.png' title='Упаковка' description='Пачкоматами InPost у надійних термобоксах з охолоджувальними елементами.' />
                    <ContentItem imgSrc='./delivery/03.png' title='Доставка' description='Доставка займає всього 1 день — швидко, зручно та без зайвих турбот.' />
                    <ContentItem imgSrc='./delivery/04.png' title='Кур’єрська доставка' description='Доставка займає всього 1 день — швидко, зручно та без зайвих турбот.' />
                </div>
            </div>
        </section>
    )
}