import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    useGetCartQuery
} from "@/entities/cart";
import { Icon } from "@/shared/icons/Icon";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { NavLink } from "react-router";
import { BagItem } from "@/features/bag/ui/BagItem";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth/api/authSlice";

type DeliveryType = "pickup" | "delivery" | "courier";
type PaymentType = "card" | "online" | "monobank";
type LocationType = "village" | "city";

interface OrderFormData {
    firstName: string;
    lastName: string;
    companyName: string;
    street: string;
    postalCode: string;
    phone: string;
    email: string;
    shipToOtherAddress: boolean;
    paczkomat: string;
    comment: string;
    regulamin: boolean;
}

export function OrderPage() {
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [deliveryType, setDeliveryType] = useState < DeliveryType > ("pickup");
    const [paymentType, setPaymentType] = useState < PaymentType > ("online");
    const [locationType, setLocationType] = useState < LocationType > ("city");


    const user = useSelector(selectAuthUser);
    const { data: cartItems = [], isLoading } = useGetCartQuery(undefined);


    const { register, handleSubmit, watch } = useForm < OrderFormData > ({
        defaultValues: { regulamin: false },
    });

    const regulaminChecked = watch("regulamin");

    const deliveryCost = deliveryType === "pickup" ? 0 : deliveryType === "delivery" ? 140 : 180;
    const productTotal = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const total = productTotal + deliveryCost;

    function onSubmit() {
        setIsOrderPlaced(true);
    }

    return (
        <div className="pt-40 pb-20">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">


                    <div className="flex flex-col gap-4">
                        <h1 className="section-title-32">Оформлення замовлення</h1>

                        {!user ?
                            <div className="bg-white rounded-[16px] p-5 flex flex-col gap-3">
                                <p className="text-14-gray">
                                    Авторизуйтеся і після першого замовлення поля заповняться автоматично
                                </p>
                                <NavLink
                                    to={navigateRoutes.navigate.profile.main}
                                    className="border border-orange-1 text-orange-1 text-[16px] font-semibold rounded-[12px] py-2.5 px-5 text-center hover:bg-orange-1/5 transition-all"
                                >
                                    Увійти в особистий кабінет
                                </NavLink>
                            </div> : ''
                        }

                        <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                            <h2 className="section-title-24">Дані для доставки</h2>

                            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Ім'я *</label>
                                    <input {...register("firstName")} placeholder="Volodymyr" className="input" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Прізвище *</label>
                                    <input {...register("lastName")} placeholder="Volodymyr" className="input" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-14-gray">Назва фірми (необов'язково)</label>
                                <input {...register("companyName")} placeholder="WebStar" className="input" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-14-gray">Вулиця та номер будинку *</label>
                                <input {...register("street")} placeholder="Шкварія 945" className="input" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-14-gray">Поштовий індекс *</label>
                                <input {...register("postalCode")} placeholder="19000" className="input" />
                            </div>

                            <div className="flex gap-6">
                                {(["village", "city"] as LocationType[]).map((type) => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="locationType"
                                            value={type}
                                            checked={locationType === type}
                                            onChange={() => setLocationType(type)}
                                            className="accent-orange-1 w-4 h-4"
                                        />
                                        <span className="text-14-gray">
                                            {type === "village" ? "Село" : "Місто"}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-14-gray">Телефон *</label>
                                <div className="flex gap-2">
                                    <div className="input flex items-center gap-1.5 w-[100px] shrink-0">
                                        <img src="/header/flag.png" alt="UA" className="w-5 h-4 object-cover" />
                                        <span className="text-14-gray">+380</span>
                                    </div>
                                    <input {...register("phone")} placeholder="(XX) XXX-XX-XX" className="input" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-14-gray">Email Address *</label>
                                <input {...register("email")} type="email" placeholder="example@gmail.com" className="input" />
                            </div>


                        </div>

                        {/* delivery type */}
                        <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                            <h2 className="section-title-24">Тип доставки</h2>
                            <div className="flex flex-col gap-3">
                                {([
                                    { value: "pickup", label: "Самовивіз (можлива оплата готівкою)" },
                                    { value: "delivery", label: "Пошта: 140 грн" },
                                    { value: "courier", label: "Кур'єр: 180,99 грн" },
                                ] as { value: DeliveryType; label: string }[]).map((opt) => (
                                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="deliveryType"
                                            value={opt.value}
                                            checked={deliveryType === opt.value}
                                            onChange={() => setDeliveryType(opt.value)}
                                            className="accent-orange-1 w-4 h-4"
                                        />
                                        <span className="text-14-gray">{opt.label}</span>
                                    </label>
                                ))}
                            </div>

                            {deliveryType === "delivery" && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Поштомат *</label>
                                    <div className="relative">
                                        <select {...register("paczkomat")} className="input appearance-none pr-10">
                                            <option value="">Вибери поштомат</option>
                                        </select>
                                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray">
                                            ▾
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* payment */}
                        <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                            <h2 className="section-title-24">Оплата</h2>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio" name="paymentType" value="card"
                                        checked={paymentType === "card"}
                                        onChange={() => setPaymentType("card")}
                                        className="accent-orange-1 w-4 h-4"
                                    />
                                    <span className="text-14-gray">Card payment</span>

                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio" name="paymentType" value="online"
                                        checked={paymentType === "online"}
                                        onChange={() => setPaymentType("online")}
                                        className="accent-orange-1 w-4 h-4"
                                    />
                                    <span className="text-14-gray">Online payment </span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio" name="paymentType" value="monobank"
                                        checked={paymentType === "monobank"}
                                        onChange={() => setPaymentType("monobank")}
                                        className="accent-orange-1 w-4 h-4"
                                    />
                                    <span className="text-14-gray">Monobank</span>
                                </label>
                            </div>
                        </div>

                        {/* comment */}
                        <div className="bg-white rounded-[16px] p-5 flex flex-col gap-3">
                            <h2 className="section-title-24">Коментар</h2>
                            <div className="flex flex-col gap-1">
                                <label className="text-14-gray">Примітка до замовлення</label>
                                <textarea {...register("comment")} className="textarea" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — order summary */}
                    <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4 lg:mt-[20px] lg:sticky lg:top-[120px]">
                        <h2 className="section-title-24">Ваше замовлення</h2>

                        {isLoading && (
                            <div className="text-14-gray text-center py-4">Завантаження...</div>
                        )}

                        {!isLoading && cartItems.length === 0 && (
                            <div className="flex flex-col items-center gap-3 py-6">
                                <Icon name="bag" className="text-[48px] text-[#d2d2d7]" />
                                <div className="text-14-gray">Кошик порожній</div>
                                <NavLink to={navigateRoutes.navigate.products.list} className="button-element">
                                    До каталогу
                                </NavLink>
                            </div>
                        )}

                        {!isLoading && cartItems.length > 0 && (
                            <div className="flex flex-col gap-3">
                                {cartItems.map((item) => (
                                    <BagItem key={item._id} item={item} />
                                ))}

                                {/* summary box */}
                                <div className="bg-[#f5f5f7] rounded-[12px] p-4 flex flex-col gap-3 mt-1">
                                    <div className="flex flex-col gap-1.5 text-14-gray">
                                        <div className="flex justify-between">
                                            <span>Вартість доставки:</span>
                                            <span>{deliveryCost} грн</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Вартість продукції:</span>
                                            <span>{productTotal} грн</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-[#d2d2d7] pt-3">
                                        <span className="text-14-gray text-[16px]">Разом:</span>
                                        <span className="text-[36px] font-bold text-black leading-none">
                                            {total} грн
                                        </span>
                                    </div>

                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("regulamin")}
                                            className="accent-orange-1 w-4 h-4 mt-0.5 shrink-0"
                                        />
                                        <span className="text-[12px] text-gray">
                                            Я ознайомився з вмістом сторінки «Правила та умови».
                                        </span>
                                    </label>

                                    {isOrderPlaced ? (
                                        <button
                                            type="button"
                                            disabled
                                            className="w-full text-[16px] font-semibold text-white bg-green-500 rounded-[12px] px-5 py-3 text-center"
                                        >
                                            Замовлення успішно оформлено
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={!regulaminChecked}
                                            onClick={handleSubmit(onSubmit)}
                                            className={`w-full text-[16px] font-semibold text-white rounded-[12px] px-5 py-3 text-center transition-all ${regulaminChecked
                                                ? "bg-orange-1 hover:bg-orange-1/80 cursor-pointer"
                                                : "bg-[#d2d2d7] cursor-not-allowed"
                                                }`}
                                        >
                                            Оформити замовлення
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
