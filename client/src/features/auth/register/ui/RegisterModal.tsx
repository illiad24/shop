import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import schema from "../model/validation";
import { useRegister } from "../model/useRegister";
import { useEffect, useState } from "react";
import { Icon } from "@/shared/icons/Icon";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLoginClick: () => void;
};

type Inputs = {
    name: string
    email: string
    password: string
}

export function RegisterModal({ open, onOpenChange, onLoginClick }: Props) {
    const { registerUser, isLoading } = useRegister();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });

    const onSubmit = async (data: any) => {
        try {
            await registerUser(data);
            onOpenChange(false);
            reset({});
        } catch (err: any) {
            const message = err?.data?.message || "Помилка при реєстрації";
            setErrorMessage(message);
        }
    };

    useEffect(() => {
        if (!open) {
            setErrorMessage(null);
            setShowPassword(false);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    w-full max-w-full sm:max-w-[464px]
                    !top-0 !right-0 !left-0 !translate-x-0 !translate-y-0
                    sm:!top-20 sm:!right-4 sm:!left-auto
                    fixed rounded-none sm:rounded-[16px]
                    p-6 sm:p-10
                "
            >
                <DialogTitle className="text-[20px] font-bold">Реєстрація</DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex flex-col gap-4">
                    <div>
                        <div className="text-14-gray mb-1.5">Ім'я*</div>
                        <div className="w-full relative">
                            <input
                                {...register("name")}
                                type="text"
                                autoComplete="name"
                                className="input w-full"
                            />
                            {errors.name && (
                                <span className="text-orange-1 text-[12px] left-0 absolute top-full mt-0.5">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="text-14-gray mb-1.5">Email*</div>
                        <div className="w-full relative">
                            <input
                                {...register("email")}
                                type="email"
                                autoComplete="email"
                                className="input w-full"
                            />
                            {errors.email && (
                                <span className="text-orange-1 text-[12px] left-0 absolute top-full mt-0.5">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="text-14-gray mb-1.5">Пароль*</div>
                        <div className="w-full relative">
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                className="input w-full pr-11"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#686870] hover:text-black transition-colors"
                                tabIndex={-1}
                            >
                                <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
                            </button>
                            {errors.password && (
                                <span className="text-orange-1 text-[12px] left-0 absolute top-full mt-0.5">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="p-3 bg-red-50 rounded-[8px] text-orange-1 text-[14px]">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="button-element w-full mt-1 disabled:opacity-60"
                    >
                        {isLoading ? "Реєстрація..." : "Зареєструватись"}
                    </button>
                </form>

                <div className="border-b border-gray-200 mb-4" />
                <div className="text-[14px] text-center">
                    Вже маєте акаунт?{" "}
                    <span
                        onClick={onLoginClick}
                        className="text-orange-1 cursor-pointer hover:underline"
                    >
                        Увійти
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
