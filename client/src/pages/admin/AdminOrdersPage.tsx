import { useState, useMemo } from "react";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/entities/order/api/orderApi";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
};

const paymentStatusLabel: Record<string, string> = {
    unpaid: "Не оплачено",
    paid: "Оплачено",
    failed: "Помилка оплати",
};

const paymentStatusColor: Record<string, string> = {
    unpaid: "bg-gray-100 text-gray-600",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-600",
};

const paymentLabel: Record<string, string> = {
    cash: "Готівка",
    online: "Онлайн (Stripe)",
};

const deliveryLabel: Record<string, string> = {
    pickup: "Самовивіз",
    delivery: "Пошта",
    courier: "Кур'єр",
};

const STATUS_FILTERS = [
    { value: "all", label: "Всі" },
    { value: "pending", label: "Очікує" },
    { value: "processing", label: "В обробці" },
    { value: "delivered", label: "Доставлено" },
    { value: "cancelled", label: "Скасовано" },
];

const STATUS_OPTIONS = [
    { value: "pending", label: "Очікує" },
    { value: "processing", label: "В обробці" },
    { value: "delivered", label: "Доставлено" },
    { value: "cancelled", label: "Скасовано" },
];

const PER_PAGE = 10;

export function AdminOrdersPage() {
    const { data: orders = [], isLoading } = useGetAllOrdersQuery();
    const [updateStatus] = useUpdateOrderStatusMutation();
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

    async function handleStatusChange(orderId: string, status: string) {
        try {
            await updateStatus({ orderId, status }).unwrap();
            toast.success("Статус оновлено");
        } catch {
            toast.error("Не вдалося оновити статус");
        }
    }

    if (isLoading) {
        return <div className="text-14-gray">Завантаження...</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <h2 className="section-title-32">Замовлення</h2>
                <span className="text-14-gray">({orders.length})</span>
            </div>

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

            {paginated.length === 0 ? (
                <div className="bg-white rounded-[16px] p-8 text-center text-14-gray">
                    Немає замовлень
                </div>
            ) : (
                paginated.map((order) => (
                    <div key={order._id} className="bg-white rounded-[16px] p-5 flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                                <h3 className="font-bold text-[16px]">
                                    #{order._id.slice(-6).toUpperCase()}
                                </h3>
                                <div className="text-[13px] text-[#686870]">
                                    {new Date(order.createdAt).toLocaleDateString("uk-UA", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <div className="text-[13px] text-[#686870] mt-0.5">
                                    {order.deliveryAddress.firstName} {order.deliveryAddress.lastName} · {order.deliveryAddress.phone}
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap items-center">
                                <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${paymentStatusColor[order.paymentStatus]}`}>
                                    {paymentStatusLabel[order.paymentStatus]}
                                </span>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className={`text-[12px] font-semibold px-3 py-1 rounded-full border-0 cursor-pointer outline-none ${statusColor[order.status]}`}
                                >
                                    {STATUS_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-[13px] text-[#686870]">
                                    <span>{item.title} × {item.quantity}</span>
                                    <span className="font-semibold text-black">{item.price * item.quantity} грн</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center border-t border-[#f0f0f0] pt-3 text-[13px] text-[#686870] flex-wrap gap-2">
                            <span>{deliveryLabel[order.deliveryType]} · {paymentLabel[order.paymentType]}</span>
                            <span className="font-bold text-black text-[18px]">{order.total} грн</span>
                        </div>
                    </div>
                ))
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#686870] disabled:opacity-30 hover:bg-[#f5f5f7] transition-all"
                    >
                        ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full text-[14px] font-semibold transition-all ${
                                page === p ? "bg-orange-1 text-white" : "bg-white text-[#686870] hover:bg-[#f5f5f7]"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#686870] disabled:opacity-30 hover:bg-[#f5f5f7] transition-all"
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
}
