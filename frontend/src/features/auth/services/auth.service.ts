import { LoginFormData, RegisterFormData } from "../validations/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(data: LoginFormData) {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Network error");
  }

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "Login failed");
  }
  return result;
}

export async function register(data: RegisterFormData) {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Network error");
  }
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || "Login failed");
  }
  return result;
}
