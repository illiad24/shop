import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { addProductSchema } from "../logic/validation"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { productCategoryList } from "../../../pages/admin/AdminProductsPage"
import {
    useAddProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
} from "../../../entities/product"
import { skipToken } from "@reduxjs/toolkit/query/react"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    id?: string
}




export function CreateProductDialog({ open, onOpenChange, id }: Props) {
    const [addProduct, { isLoading: adding, error: addError }] = useAddProductMutation()
    const [updateProduct, { isLoading: updating, error: updateError }] = useUpdateProductMutation()
    const [errorMessage, setErrorMessage] = useState < string | null > (null)

    const { data: product, isLoading: fetching } = useGetProductQuery(id ?? skipToken)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addProductSchema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (product) {
            reset({
                title: product.title,
                category: product.category,
                description: product.description,
                portionWeightGrams: product.portionWeightGrams,
                price: product.price,
                stockPortions: product.stockPortions,
                label: product.label
            })
        } else if (!id) {
            reset({})
        }
    }, [product, id, reset])

    useEffect(() => {
        if (!open) {
            setErrorMessage(null)
        }
    }, [open])

    useEffect(() => {
        if (addError || updateError) {
            const error = addError || updateError
            const message = (error as any)?.data?.message || (error as any)?.message || "Помилка при збереженні"
            setErrorMessage(message)
        }
    }, [addError, updateError])

    const onSubmit = async (data: any) => {
        setErrorMessage(null)
        const payload = {
            ...data,
            price: Number(data.price),
            portionWeightGrams: Number(data.portionWeightGrams),
            stockPortions: Number(data.stockPortions),
        }
        try {
            if (id) {
                await updateProduct({ id, data: payload }).unwrap()
            } else {
                await addProduct(payload).unwrap()
            }
            onOpenChange(false)
            reset({})
        } catch (error: any) {
            const message = error?.data?.message || "Помилка при збереженні"
            setErrorMessage(message)
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{id ? 'Редагування товару' : 'Додавання товару'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4 mb-5 last:mb-0">
                        <div>
                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Назва*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("title")}
                                        type="text"
                                        className="input"
                                    />
                                    {errors.title && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.title.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Категорія*
                                </div>

                                <div className="w-full">
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="input">
                                                    <SelectValue placeholder="Оберіть категорію" />
                                                </SelectTrigger>

                                                <SelectContent position="popper">
                                                    <SelectGroup>
                                                        {productCategoryList.map(el => (
                                                            <SelectItem key={el.value} value={el.value}>
                                                                {el.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    {errors.category?.message && (
                                        <p className="mt-1 text-[12px] text-orange-1">
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Опис*
                                </div>
                                <div className="w-full relative">
                                    <textarea
                                        {...register("description")}

                                        className="input textarea"
                                    />
                                    {errors.description && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.description.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Грам в 1 порції*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("portionWeightGrams")}

                                        className="input"
                                    />
                                    {errors.portionWeightGrams && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.portionWeightGrams.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Ціна*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("price")}

                                        className="input"
                                    />
                                    {errors.price && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.price.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Кількість в 1 порції*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("stockPortions")}
                                        type="text"
                                        className="input"
                                    />
                                    {errors.stockPortions && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.stockPortions.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Label*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("label")}

                                        className="input"
                                    />
                                    {errors.label && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.label.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        {errorMessage && (
                            <div className="mb-3 p-3 bg-red-50  rounded-[8px] text-orange-1 text-[14px]">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="button-element"
                            disabled={adding || updating || fetching}
                        >
                            {adding || updating ? 'Збереження...' : 'Зберегти'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}
