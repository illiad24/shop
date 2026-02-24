import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { addProductSchema } from "../logic/validation"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

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
            setImagePreview((product as any).image || null)
        } else if (!id) {
            reset({})
            setImagePreview(null)
        }
    }, [product, id, reset])

    useEffect(() => {
        if (!open) {
            setErrorMessage(null)
            setImageFile(null)
            setImagePreview(null)
        }
    }, [open])

    useEffect(() => {
        if (addError || updateError) {
            const error = addError || updateError
            const message = (error as any)?.data?.message || (error as any)?.message || "Помилка при збереженні"
            setErrorMessage(message)
        }
    }, [addError, updateError])

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const onSubmit = async (data: any) => {
        setErrorMessage(null)
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("category", data.category)
        formData.append("description", data.description)
        formData.append("portionWeightGrams", String(Number(data.portionWeightGrams)))
        formData.append("price", String(Number(data.price)))
        formData.append("stockPortions", String(Number(data.stockPortions)))
        if (data.label) formData.append("label", data.label)
        if (imageFile) formData.append("image", imageFile)

        try {
            if (id) {
                await updateProduct({ id, data: formData }).unwrap()
            } else {
                await addProduct(formData).unwrap()
            }
            onOpenChange(false)
            reset({})
            setImageFile(null)
            setImagePreview(null)
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

                        <div>
                            <div className="text-14-gray mb-1.5">Фото товару</div>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full aspect-square rounded-[12px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-orange-1 transition-colors overflow-hidden"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-gray-400 px-4">
                                        <div className="text-3xl mb-2">+</div>
                                        <div className="text-[13px]">Натисніть щоб завантажити</div>
                                        <div className="text-[11px] mt-1">JPG, PNG до 5MB</div>
                                    </div>
                                )}
                            </div>
                            {imagePreview && (
                                <button
                                    type="button"
                                    onClick={() => { setImageFile(null); setImagePreview(null) }}
                                    className="mt-2 text-[12px] text-gray-400 hover:text-orange-1 transition-colors"
                                >
                                    Видалити фото
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        {errorMessage && (
                            <div className="mb-3 p-3 bg-red-50 rounded-[8px] text-orange-1 text-[14px]">
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
        </Dialog>
    )
}
