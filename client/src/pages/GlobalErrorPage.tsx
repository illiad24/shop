export function GlobalErrorPage() {
    return (
        <div className="flex justify-center items-center flex-auto">
            <div className="max-w-[400px] relative mx-auto text-center py-20 rounded-2xl overflow-hidden flex justify-center items-center flex-col ">
                <img src="/footer.png" alt="Image" className="absolute-element" />
                <h1 className="section-title-24 mb-6 last:mb-0 text-black">Щось пішло не так!</h1>
                <div className="text-14-gray text-[16px] text-black">
                    <p>
                        Вибачте, сталася помилка при завантаженні сторінки.
                    </p>
                </div>
            </div>
        </div>
    )
}