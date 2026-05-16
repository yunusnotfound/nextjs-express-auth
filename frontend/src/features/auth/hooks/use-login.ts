import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "../services/auth.service";
import { AuthError, getAuthErrorMessage } from "../utils/auth-error";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<AuthError | null>(null);

  async function handleLogin(data: LoginCredentials) {
    setLoading(true);

    try {
      await login(data);
      setApiError(null);

      router.push("/dashboard");
    } catch (error) {
      setApiError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    apiError,
    handleLogin,
  };
}
