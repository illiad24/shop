import { Icon } from "../../shared/icons/Icon";

export function ProductItem() {
    return (
        <div className="bg-white p-5 rounded-[20px]">
            <div className="relative mb-6 last:mb-0">
                <div className="absolute p-2 z-3 top-2.5 py-2 px-2.5 left-4 rounded-[8px] bg-main text-white font-medium text-[14px]">Новинка</div>
                <div className="relative pb-[40%]"><img className="absolute-element object-cover rounded-[20px]" src="/footer.png" alt="Image" /></div>
                <div className="absolute p-2 z-3 top-2.5 right-4 w-9 h-9 flex justify-center items-center bg-[#f5f5f7] rounded-[8px]">
                    <Icon name='favorite' className="text-orange-1" />
                </div>
            </div>
            <div>
                <div className="flex justify-between gap-2 mb-5 last:mb-0">
                    <h3 className="section-title-24">Назва</h3>
                    <div className="text-main text-[18px]">
                        290 г
                    </div>
                </div>
                <div className="text-14-gray mb-6 last:mb-0 ">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quo cum, mollitia facere laborum pariatur quae fugiat  iusto, quia excepturi.</p>
                </div>
                <div className="flex justify-between gap-2">
                    <div className="text-black text-[18px] font-bold">
                        515 <span className="text-grey"> грн</span></div>
                    <div className="py-2.5 px-6 bg-orange-1/55 rounded-2xl text-white text-3xl cursor-pointer hover:bg-orange-1/70 transition-colors">+</div>
                </div>
            </div>
        </div>
    )
}