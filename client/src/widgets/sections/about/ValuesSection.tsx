import { ContentItem } from "../../../features/components/ContentItem";

export function ValuesSection() {
    return (
        <section className="py-15">
            <div className="container">
                <h2 className="section-title-32 mb-10 last:mb-0 ">Наші <span className="text-orange-1">цінності</span></h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
                    <ContentItem imgSrc="./about/values/01.png" title="Свіжість без компромісів" description="Кожен продукт відбирається з особливою увагою, щоб ви отримували лише найкраще." />
                    <ContentItem imgSrc="./about/values/02.png" title="Сила сімейних традицій" description="Ми обираємо те, що подали б на власний святковий стіл." />
                    <ContentItem imgSrc="./about/values/03.png" title="Довіра та відкритість" description="Чесність у роботі та прозорість у кожній деталі — основа наших відносин із клієнтами." />
                    <ContentItem imgSrc="./about/values/04.png" title="Турбота про кожного" description="Ми поруч на кожному етапі — від вибору продукту до його подачі на вашому столі." />
                    <ContentItem imgSrc="./about/values/05.png" title="Моменти, що об’єднують" description="Наші морепродукти створені, щоб робити кожну вечерю маленьким святом для всієї родини." />
                </div>
            </div>
        </section>
    )
}