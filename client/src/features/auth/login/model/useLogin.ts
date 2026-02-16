import { useLoginMutation } from "../../api/authApi";

export function useLogin() {
  const [loginMutation, { isLoading, error, isSuccess }] = useLoginMutation();

  async function loginUser(data: any) {
    await loginMutation(data).unwrap();
  }

  return { loginUser, isLoading, error, isSuccess };
}
