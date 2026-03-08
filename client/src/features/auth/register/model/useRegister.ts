import { useRegisterMutation, useLoginMutation } from "../../api/authApi";

export function useRegister() {
  const [registerMutation, { isLoading, error }] = useRegisterMutation();
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  async function registerUser(data: any) {
    await registerMutation(data).unwrap();
    await loginMutation({ email: data.email, password: data.password }).unwrap();
  }

  return { registerUser, isLoading: isLoading || isLoginLoading, error };
}
