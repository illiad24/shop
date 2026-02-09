export function AdminProductsPage() {
    return (
        <div>
            <div className="flex gap-4 items-center mb-5 last:mb-0">
                <h2 className="section-title-32">Товари</h2>
                <button className="button-element">Створити товар</button>
            </div>
            <div className="rounded-[12px] bg-white px-5 py-2.5 mb-8 last:mb-0 flex items-center gap-4  justify-between ">
                <button className="text-14-gray rounded-[12px] rounded-[12px] px-5 py-2  active transition-all  hover:text-white hover:bg-[rgba(12,52,98,0.1)] [&.active]:text-main [&.active]:bg-[rgba(12,52,98,0.1)]">Охолоджена продукція</button>
                <button className="text-14-gray rounded-[12px] rounded-[12px] px-5 py-2   transition-all  hover:text-main hover:bg-[rgba(12,52,98,0.1)] [&.active]:text-main [&.active]:bg-[rgba(12,52,98,0.1)]">Заморозка</button>
                <button className="text-14-gray rounded-[12px] rounded-[12px] px-5 py-2   transition-all  hover:text-main hover:bg-[rgba(12,52,98,0.1)] [&.active]:text-main [&.active]:bg-[rgba(12,52,98,0.1)]">Готова продукція</button>
                <button className="text-14-gray rounded-[12px] rounded-[12px] px-5 py-2   transition-all  hover:text-main hover:bg-[rgba(12,52,98,0.1)] [&.active]:text-main [&.active]:bg-[rgba(12,52,98,0.1)]"> Маринована продукція</button>
                <button className="text-14-gray rounded-[12px] rounded-[12px] px-5 py-2   transition-all  hover:text-main hover:bg-[rgba(12,52,98,0.1)] [&.active]:text-main [&.active]:bg-[rgba(12,52,98,0.1)]">Снеки</button>
            </div>
            <div>
                <div>

                </div>
            </div>
        </div>
    )
}