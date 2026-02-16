import { useRegisterMutation } from "../../api/authApi";

export function useRegister() {
  const [registerMutation, { isLoading, error, isSuccess }] =
    useRegisterMutation();

  async function registerUser(data: any) {
    await registerMutation(data).unwrap();
  }

  return { registerUser, isLoading, error, isSuccess };
}
