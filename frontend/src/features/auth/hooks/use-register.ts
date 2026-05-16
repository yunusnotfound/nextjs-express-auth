import { useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "../services/auth.service";
import { AuthError, getAuthErrorMessage } from "../utils/auth-error";

interface RegisterCredentials {
  email: string;
  password: string;
}

export function useRegister() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<AuthError | null>(null);

  async function handleRegister(data: RegisterCredentials) {
    setLoading(true);

    try {
      await register(data);
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
    handleRegister,
  };
}
