import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser, selectAuthLoading } from "@/features/auth/api/authSlice";
import { useGetMyOrdersQuery } from "@/entities/order/api/orderApi";
import { navigateRoutes } from "@/shared/config/routes/navigateRoutes";
import { EmptyFiledInfo } from "./EmptyFiledInfo";

const statusLabel = {
    pending: "Очікує",
    processing: "В обробці",
    delivered: "Доставлено",
    cancelled: "Скасовано",
};

const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
};

const deliveryLabel = {
    pickup: "Самовивіз",
    delivery: "Пошта",
    courier: "Кур'єр",
};

const paymentLabel = {
    card: "Карткою",
    online: "Онлайн",
    monobank: "Monobank",
};

const STATUS_FILTERS = [
    { value: "all", label: "Всі" },
    { value: "pending", label: "Очікує" },
    { value: "processing", label: "В обробці" },
    { value: "delivered", label: "Доставлено" },
    { value: "cancelled", label: "Скасовано" },
];

const PER_PAGE = 3;

export function OrderHistory() {
    const user = useSelector(selectAuthUser);
    const authLoading = useSelector(selectAuthLoading);

    const { data: orders = [], isLoading } = useGetMyOrdersQuery(undefined, {
        skip: authLoading || !user,
    });

    const [statusFilter, setStatusFilter] = useState("all");
    const [sortDate, setSortDate] = useState("desc");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        let result = [...orders];
        if (statusFilter !== "all") {
            result = result.filter((o) => o.status === statusFilter);
        }
        result.sort((a, b) => {
            const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            return sortDate === "desc" ? -diff : diff;
        });
        return result;
    }, [orders, statusFilter, sortDate]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    if (authLoading || isLoading) {
        return <div className="text-14-gray">Завантаження...</div>;
    }

    if (orders.length === 0) {
        return (
            <EmptyFiledInfo
                imgSrc='/favorite/profile.png'
                title='У вас ще немає замовлень'
                description='Тут відображатимуться ваші попередні та активні замовлення, щойно ви зробите перше.'
                linkText='Зробити замовлення'
                linkUrl={navigateRoutes.navigate.products.list}
            />
        );
    }

    return (
        <div className="flex flex-col gap-4">

            {/* Фільтри */}
            <div className="bg-white rounded-[16px] p-4 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => { setStatusFilter(f.value); setPage(1); }}
                            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                                statusFilter === f.value
                                    ? "bg-orange-1 text-white"
                                    : "bg-[#f5f5f7] text-[#686870] hover:bg-[#e8e8ed]"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => { setSortDate((p) => p === "desc" ? "asc" : "desc"); setPage(1); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] text-[#686870] text-[13px] font-semibold hover:bg-[#e8e8ed] transition-all"
                >
                    {sortDate === "desc" ? "↓" : "↑"} {sortDate === "desc" ? "Спочатку нові" : "Спочатку старі"}
                </button>
            </div>

            {/* Список */}
            {paginated.length === 0 ? (
                <div className="bg-white rounded-[16px] p-8 text-center text-14-gray">
                    Немає замовлень з таким статусом
                </div>
            ) : (
                paginated.map((order) => (
                    <div key={order._id} className="bg-white rounded-[16px] p-5 flex flex-col gap-4">

                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h2 className="section-title-24">
                                    Замовлення #{order._id.slice(-6).toUpperCase()}
                                </h2>
                                <span className="text-[13px] text-[#686870]">
                                    {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <span className={`text-[12px] font-semibold px-3 py-1 rounded-full shrink-0 ${statusColor[order.status]}`}>
                                {statusLabel[order.status]}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-[#f5f5f7] rounded-[12px]">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-black text-[14px] mb-0.5 truncate">
                                            {item.title}
                                        </div>
                                        <div className="text-[12px] text-orange-1">
                                            {item.price} грн / шт
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-black font-bold text-[13px] whitespace-nowrap">
                                            {item.price * item.quantity} грн
                                        </span>
                                        <span className="w-7 h-7 flex items-center justify-center bg-white rounded-[7px] text-black font-bold text-[14px]">
                                            {item.quantity}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#f5f5f7] rounded-[12px] p-4 flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5 text-14-gray">
                                <div className="flex justify-between">
                                    <span>Доставка:</span>
                                    <span>{deliveryLabel[order.deliveryType]} · {order.deliveryCost === 0 ? "безкоштовно" : `${order.deliveryCost} грн`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Оплата:</span>
                                    <span>{paymentLabel[order.paymentType]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Адреса:</span>
                                    <span className="text-right">{order.deliveryAddress.street}, {order.deliveryAddress.postalCode}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end border-t border-[#d2d2d7] pt-3">
                                <span className="text-14-gray text-[16px]">Разом:</span>
                                <span className="text-[36px] font-bold text-black leading-none">
                                    {order.total} грн
                                </span>
                            </div>
                        </div>

                    </div>
                ))
            )}

            {/* Пагінація */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#686870] text-[16px] disabled:opacity-30 hover:bg-[#f5f5f7] transition-all"
                    >
                        ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full text-[14px] font-semibold transition-all ${
                                page === p
                                    ? "bg-orange-1 text-white"
                                    : "bg-white text-[#686870] hover:bg-[#f5f5f7]"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#686870] text-[16px] disabled:opacity-30 hover:bg-[#f5f5f7] transition-all"
                    >
                        →
                    </button>
                </div>
            )}

        </div>
    );
}
