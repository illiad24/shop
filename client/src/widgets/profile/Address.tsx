import { useState } from "react";
import {
    useGetAddressesQuery,
    useAddAddressMutation,
    useRemoveAddressMutation,
} from "@/entities/address/api/addressApi";

export function Address() {
    const { data: addresses = [], isLoading } = useGetAddressesQuery();
    const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
    const [removeAddress] = useRemoveAddressMutation();

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        city: "",
        street: "",
        apartment: "",
        recipientName: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await addAddress(form);
        setForm({ city: "", street: "", apartment: "", recipientName: "" });
        setShowForm(false);
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-white p-5 rounded-[12px]">
            <div className="flex items-center justify-between mb-5">
                <div className="section-title-24">Адреси доставки</div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="button-element"
                    >
                        + Додати адресу
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 border border-gray-200 rounded-[12px] p-4 flex flex-col gap-3">
                    <div className="font-semibold text-[16px] mb-1">Нова адреса</div>
                    <input
                        name="recipientName"
                        value={form.recipientName}
                        onChange={handleChange}
                        placeholder="Ім'я отримувача"
                        required
                        className="border border-gray-200 rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-orange-1"
                    />
                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Місто"
                        required
                        className="border border-gray-200 rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-orange-1"
                    />
                    <input
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        placeholder="Вулиця та будинок"
                        required
                        className="border border-gray-200 rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-orange-1"
                    />
                    <input
                        name="apartment"
                        value={form.apartment}
                        onChange={handleChange}
                        placeholder="Квартира / поверх (необов'язково)"
                        className="border border-gray-200 rounded-[8px] px-4 py-2.5 text-[14px] outline-none focus:border-orange-1"
                    />
                    <div className="flex gap-3 mt-1">
                        <button
                            type="submit"
                            disabled={isAdding}
                            className="button-element"
                        >
                            {isAdding ? "Збереження..." : "Зберегти"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-5 py-2.5 rounded-[8px] border border-gray-200 text-[14px] hover:border-gray-400 transition-all"
                        >
                            Скасувати
                        </button>
                    </div>
                </form>
            )}

            {addresses.length === 0 && !showForm ? (
                <div className="text-14-gray text-[16px]">
                    У вас ще немає збережених адрес
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {addresses.map((addr) => (
                        <div
                            key={addr._id}
                            className="flex items-start justify-between border border-gray-200 rounded-[12px] p-4"
                        >
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-[15px]">{addr.recipientName}</div>
                                <div className="text-[14px] text-[#686870]">
                                    {addr.city}, {addr.street}
                                    {addr.apartment ? `, кв./пов. ${addr.apartment}` : ""}
                                </div>
                            </div>
                            <button
                                onClick={() => removeAddress(addr._id)}
                                className="text-[#686870] hover:text-red-500 transition-all text-[13px] shrink-0 ml-4"
                            >
                                Видалити
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
