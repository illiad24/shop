export function MapSection() {
    return (
        <section className="pb-32">
            <div className="container">
                <h2 className="section-title-32 mb-10 last:mb-0">Карта самовивоза</h2>
                <div className="relative  rounded-2xl overflow-hidden">
                    <div className="pb-[56.25%] relative mb-2.5"><iframe className="absolute-element" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162758.30824625044!2d30.367885463110266!3d50.40200063609459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1769781000280!5m2!1suk!2sua" loading="lazy" ></iframe></div>

                    <div className=" rounded-[20px] relative xs:absolute xs:top-4 xs:left-4 z-10
                   block    
                   xs:inline-block
  border 
  border-[#eaeaea] 
  p-5 
  px-6 
  bg-[#ffffff] 
  shadow-[0_2px_4px_0_rgba(0,0,0,0.17)]">
                        <div className="">
                            <div className="text-[18px] text-black mb-2 last:mb-0">
                                Графік роботи
                            </div>
                            <div className="flex gap-2 xs:block">

                                <div className="text-14-gray">
                                    пн-пт
                                    9:00 - 18:00
                                </div>
                                <div className="text-14-gray">
                                    сб-нд
                                    9:00 - 15:00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}