import { useState } from "react";
import { Icon } from "../../shared/icons/Icon";

export function ProductItem() {

    const [filled, setFilled] = useState < Boolean > (false);
    return (
        <div className="bg-white p-5 rounded-[20px]">
            <div className="relative mb-6 last:mb-0">
                <div className="absolute p-2 z-3 top-2.5 py-1 px-2.5 left-4 rounded-[8px] bg-main text-white font-medium text-[14px]">Новинка</div>
                <a href="/" className="relative block pb-[70%]"><img className="absolute-element object-cover rounded-[20px]" src="/footer.png" alt="Image" /></a>
                <button onClick={() => setFilled(!filled)} className="absolute p-2 z-3 top-2.5 right-4 w-8 h-8 flex justify-center items-center bg-[#f5f5f7] rounded-[8px] cursor-pointer">
                    <Icon name='favorite' className="text-orange-1 transition-colors" filled={filled} />
                </button>
            </div>
            <div>
                <div className="flex justify-between gap-2 mb-5 last:mb-0">
                    <a href="/">
                        <h3 className="section-title-24 hover:text-orange-1 transition-colors">Назва</h3>
                    </a>
                    <div className="text-main text-[18px] font-bold">
                        290 г
                    </div>
                </div>
                <div className="text-14-gray mb-6 last:mb-0 ">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quo cum, mollitia facere laborum pariatur quae fugiat  iusto, quia excepturi.</p>
                </div>
                <div className="flex justify-between gap-2 items-center">
                    <div className="text-black text-[18px] font-bold">
                        515 <span className="text-grey"> грн</span></div>
                    <button className="py-1 px-6 bg-orange-1/55 rounded-2xl text-white text-3xl cursor-pointer hover:bg-orange-1/70 transition-colors">+</button>
                </div>
            </div>
        </div>
    )
}