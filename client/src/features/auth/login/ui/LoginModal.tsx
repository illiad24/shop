import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "../model/validation";
import { useLogin } from "../model/useLogin";
import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRegisterClick: () => void;
};

type Inputs = {
    email: string
    password: string
}

export function LoginModal({ open, onOpenChange, onRegisterClick }: Props) {
    const { loginUser, error, isLoading, isSuccess } = useLogin();
    const [errorMessage, setErrorMessage] = useState < string | null > (null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm < Inputs > ({ resolver: yupResolver(schema) })
    const onSubmit = async (data: any) => {
        try {
            await loginUser(data)
            setTimeout(() => {
                onOpenChange(false)
            }, 2000);
            reset({})
        } catch (error) {
            const message = error?.data?.message || "Помилка при збереженні"
            setErrorMessage(message)
        }
    }
    useEffect(() => {
        if (!open) {
            setErrorMessage(null)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                   sm:max-w-[464px]
                    !top-20 !right-4 !left-auto !translate-x-0 !translate-y-0
                    fixed
                    p-10
                    "
            >
                <DialogTitle>Вхід</DialogTitle>
                {isSuccess &&
                    <div className="text-center text-2xl p-10 min-h-[100px]">
                        Вхід виконано успішно
                    </div>
                }
                {!isSuccess &&
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Email*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("email")}
                                        type="text"
                                        className="input"
                                    />
                                    {errors.email && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-5 last:mb-0">
                                <div className="text-14-gray mb-1.5 last:mb-0">
                                    Пароль*
                                </div>
                                <div className="w-full relative">
                                    <input
                                        {...register("password")}
                                        type="text"
                                        className="input"
                                    />
                                    {errors.password && (
                                        <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {errorMessage && (
                                <div className="mb-2 bg-red-50  rounded-[8px] text-orange-1 text-[14px]">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="w-full">
                                <button type='submit' className="button-element w-full">{isLoading ? 'Загрузка...' : 'Увійти'}</button>
                            </div>
                        </form>
                        <div className="border-bottom border-gray border-b-1 mb-4"></div>
                        <div>
                            <div className="text-[14px] text-center">
                                Не маєте? <span onClick={onRegisterClick} className="text-orange-1 cursor-pointer hover:underline">Зареєструватись</span>
                            </div>
                        </div>
                    </div>
                }
            </DialogContent>
        </Dialog>
    );
}
