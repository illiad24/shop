import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@/shared/icons/Icon";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { NavLink } from "react-router";
import { BagItem } from "@/features/bag/ui/BagItem";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser, selectAuthLoading } from "@/features/auth/api/authSlice";
import { useMeQuery } from "@/features/auth/api/authApi";
import { useCreateOrderMutation, useInitiateCheckoutMutation } from "@/entities/order/api/orderApi";
import { useCart } from "@/shared/hooks/useCart";
import { guestClearCart } from "@/features/guestCart/guestCartSlice";
import { useAuthModal } from "@/shared/providers/AuthModalProvider";
import { toast } from "sonner";

type DeliveryType = "pickup" | "delivery" | "courier";
type PaymentType = "cash" | "online";
type LocationType = "village" | "city";

interface OrderFormData {
    firstName: string;
    lastName: string;
    companyName: string;
    street: string;
    postalCode: string;
    phone: string;
    email: string;
    paczkomat: string;
    comment: string;
    regulamin: boolean;
}

export function OrderPage() {
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [deliveryType, setDeliveryType] = useState < DeliveryType > ("pickup");
    const [paymentType, setPaymentType] = useState < PaymentType > ("online");
    const [locationType, setLocationType] = useState < LocationType > ("city");

    const dispatch = useDispatch();
    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);
    const { data: userInfo } = useMeQuery(undefined, { skip: authLoading || !user });
    const { items: cartItems, isLoading, isGuest } = useCart();

    const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm < OrderFormData > ({
        defaultValues: { regulamin: false },
    });

    useEffect(() => {
        if (userInfo) {
            const [firstName = "", ...rest] = userInfo.name.split(" ");
            reset({
                firstName,
                lastName: rest.join(" "),
                email: userInfo.email,
                regulamin: false
            });
        }
    }, [userInfo, reset]);

    const regulaminChecked = watch("regulamin");

    const deliveryCost = deliveryType === "pickup" ? 0 : deliveryType === "delivery" ? 140 : 180;
    const productTotal = cartItems.reduce((sum: number, item) => sum + item.productId.price * item.quantity, 0);
    const total = productTotal + deliveryCost;
    const { openLogin } = useAuthModal();
    const [initiateCheckout] = useInitiateCheckoutMutation();

    async function onSubmit(data: OrderFormData) {
        try {
            const order = await createOrder({
                firstName: data.firstName,
                lastName: data.lastName,
                companyName: data.companyName,
                street: data.street,
                postalCode: data.postalCode,
                phone: data.phone,
                email: data.email,
                paczkomat: data.paczkomat,
                comment: data.comment,
                deliveryType,
                paymentType,
                locationType,
                ...(isGuest && {
                    items: cartItems.map((item) => ({
                        productId: item.productId._id,
                        title: item.productId.title,
                        price: item.productId.price,
                        quantity: item.quantity,
                    })),
                }),
            }).unwrap();
            if (paymentType === 'online') {
                const { url } = await initiateCheckout(order._id).unwrap();
                window.location.href = url;
            } else {
                if (isGuest) dispatch(guestClearCart());
                setIsOrderPlaced(true);
            }
        } catch (err: any) {
            const message = err?.data?.message ?? "Помилка при оформленні замовлення";
            toast.error(message);
        }
    }

    return (
        <div className="pt-10 md:pt-45 pb-20">
            <div className="container">
                {!isOrderPlaced ?
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">

                        <div className="flex flex-col gap-4">
                            <h1 className="section-title-32">Оформлення замовлення</h1>

                            {!user && (
                                <div className="bg-white rounded-[16px] p-5 flex flex-col gap-3">
                                    <p className="text-14-gray">
                                        Авторизуйтеся і після першого замовлення поля заповняться автоматично
                                    </p>
                                    <button
                                        onClick={() => openLogin()}
                                        className="border border-orange-1 text-orange-1 text-[16px] font-semibold rounded-[12px] py-2.5 px-5 text-center hover:bg-orange-1/5 transition-all"
                                    >
                                        Увійти в особистий кабінет
                                    </button>
                                </div>
                            )}

                            {userInfo?.addresses && userInfo.addresses.length > 0 && (
                                <div className="bg-white rounded-[16px] p-5 flex flex-col gap-3">
                                    <h2 className="section-title-24">Збережені адреси</h2>
                                    <div className="flex flex-col gap-2">
                                        {userInfo.addresses.map((addr) => (
                                            <button
                                                key={addr._id}
                                                type="button"
                                                onClick={() =>
                                                    reset((prev) => ({
                                                        ...prev,
                                                        street: addr.street,
                                                        postalCode: addr?.postalCode ?? ""
                                                    }))
                                                }
                                                className="text-left border border-[#d2d2d7] rounded-[10px] p-3 hover:border-orange-1 transition-all text-14-gray"
                                            >
                                                {addr.recipientName} — {addr.city}, {addr.street}
                                                {addr.apartment && `, кв. ${addr.apartment}`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                                <h2 className="section-title-24">Дані для доставки</h2>

                                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-14-gray">Ім'я *</label>
                                        <input
                                            {...register("firstName", { required: "Ім'я обов'язкове" })}

                                            className="input"
                                        />
                                        {errors.firstName && (
                                            <span className="text-red-500 text-xs">{errors.firstName.message}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-14-gray">Прізвище *</label>
                                        <input
                                            {...register("lastName", { required: "Прізвище обов'язкове" })}

                                            className="input"
                                        />
                                        {errors.lastName && (
                                            <span className="text-red-500 text-xs">{errors.lastName.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Назва фірми (необов'язково)</label>
                                    <input {...register("companyName")} className="input" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Вулиця та номер будинку *</label>
                                    <input
                                        {...register("street", { required: "Вулиця обов'язкова" })}

                                        className="input"
                                    />
                                    {errors.street && (
                                        <span className="text-red-500 text-xs">{errors.street.message}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Поштовий індекс *</label>
                                    <input
                                        {...register("postalCode", { required: "Індекс обов'язковий" })}

                                        className="input"
                                    />
                                    {errors.postalCode && (
                                        <span className="text-red-500 text-xs">{errors.postalCode.message}</span>
                                    )}
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
                                        <input
                                            {...register("phone", { required: "Телефон обов'язковий" })}
                                            placeholder="(XX) XXX-XX-XX"
                                            className="input"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <span className="text-red-500 text-xs">{errors.phone.message}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Email *</label>
                                    <input
                                        {...register("email", {
                                            required: "Email обов'язковий",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Невірний формат email",
                                            },
                                        })}
                                        type="email"
                                        className="input"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-xs">{errors.email.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                                <h2 className="section-title-24">Тип доставки</h2>
                                <div className="flex flex-col gap-3">
                                    {([
                                        { value: "pickup", label: "Самовивіз (можлива оплата готівкою)" },
                                        { value: "delivery", label: "Пошта: 140 грн" },
                                        { value: "courier", label: "Кур'єр: 180 грн" },
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

                            </div>

                            <div className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                                <h2 className="section-title-24">Оплата</h2>
                                <div className="flex flex-col gap-3">
                                    {([
                                        { value: "cash", label: "Готівка" },
                                        { value: "online", label: "Онлайн оплата" }
                                    ] as { value: PaymentType; label: string }[]).map((opt) => (
                                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value={opt.value}
                                                checked={paymentType === opt.value}
                                                onChange={() => setPaymentType(opt.value)}
                                                className="accent-orange-1 w-4 h-4"
                                            />
                                            <span className="text-14-gray">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-[16px] p-5 flex flex-col gap-3">
                                <h2 className="section-title-24">Коментар</h2>
                                <div className="flex flex-col gap-1">
                                    <label className="text-14-gray">Примітка до замовлення</label>
                                    <textarea {...register("comment")} className="textarea p-4" />
                                </div>
                            </div>
                        </div>

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
                                                {...register("regulamin", { required: true })}
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
                                                disabled={!regulaminChecked || isCreating}
                                                onClick={handleSubmit(onSubmit)}
                                                className={`w-full text-[16px] font-semibold text-white rounded-[12px] px-5 py-3 text-center transition-all ${regulaminChecked && !isCreating
                                                    ? "bg-orange-1 hover:bg-orange-1/80 cursor-pointer"
                                                    : "bg-[#d2d2d7] cursor-not-allowed"
                                                    }`}
                                            >
                                                {isCreating ? "Оформлення..." : "Оформити замовлення"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    :
                    <div className="max-w-[489px] mx-auto">
                        <div className="bg-white rounded-[12px] text-center p-10 max-md:p-4">
                            <div className="section-title-24 mb-4">
                                Замовлення успішно оформлено!
                            </div>
                            <div className="text-[16px] mb-4">
                                Дякуємо за замовлення! Ми вже дбайливо пакуємо ваші морепродукти та готуємо їх до відправки
                            </div>
                            <NavLink className='button-element' to={navigateRoutes.navigate.home}>
                                На головну
                            </NavLink>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
