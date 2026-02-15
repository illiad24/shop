import { useForm, type SubmitHandler } from "react-hook-form"
import { useLoginMutation } from "../../features/auth/api/authApi"
import { useNavigate } from "react-router"
import { useState } from "react"

type Inputs = {
    email: string
    password: string
}

export function AdminLoginPage() {
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm < Inputs > ()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const result = await login(data).unwrap()
            if (result) {
                alert('ok')
            }
            reset()
            navigate("/admin")
        } catch (err: any) {
            reset()
            setErrorMsg(err.data?.message || "Login failed")
        }
    }

    return (
        <div className="relative flex-1 flex ">
            <img className="absolute-element" src="/footer.png" alt="Image" />
            <div className="flex justify-center flex-col relative z-10 flex-1">
                <h1 className="section-title-32 text-center mb-5 last:mb-0">
                    ADMIN PANEL
                </h1>

                <div className="p-8 bg-white rounded-2xl max-w-[540px] w-full mx-auto">
                    <h3 className="section-title-24 mb-10">
                        Login
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5 last:mb-0">
                            <div className="text-14-gray mb-1.5 last:mb-0">
                                Email
                            </div>
                            <div className="w-full relative">
                                <input
                                    placeholder="Email"
                                    type="text"
                                    className="input"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mb-5 last:mb-0">
                            <div className="text-14-gray mb-1.5 last:mb-0">
                                Password
                            </div>
                            <div className="w-full relative" >
                                <input
                                    placeholder="Password"
                                    type="password"
                                    className="input"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <span className="text-orange-1 text-[12px] left-0 absolute top-full">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        {errorMsg && (
                            <span className="text-orange-1 text-[12px] left-0 relative top-full">
                                {errorMsg}
                            </span>
                        )}

                        <div className="text-right">
                            <button className="button-element">
                                Ввійти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
