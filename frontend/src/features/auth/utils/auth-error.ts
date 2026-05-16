export const AUTH_ERROR_TYPE = {
  NETWORK: "NETWORK_ERROR",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNKNOWN: "UNKNOWN_ERROR",
} as const;

export type AuthErrorType =
  (typeof AUTH_ERROR_TYPE)[keyof typeof AUTH_ERROR_TYPE];

export type AuthError = {
  type: AuthErrorType;
  message: string;
};

export function getAuthErrorMessage(error: unknown): AuthError {
  if (error instanceof Error) {
    const message = error.message;

    // Network errors (fetch)
    if (
      message === "Failed to fetch" ||
      message === "Network Error" ||
      message.includes("fetch")
    ) {
      return {
        type: AUTH_ERROR_TYPE.NETWORK,
        message:
          "Network error occurred. Please check your internet connection.",
      };
    }

    // Invalid credentials
    if (message === "Invalid credentials") {
      return {
        type: AUTH_ERROR_TYPE.INVALID_CREDENTIALS,
        message: "Email or password is incorrect",
      };
    }

    // Default known error
    return {
      type: AUTH_ERROR_TYPE.UNKNOWN,
      message,
    };
  }

  return {
    type: AUTH_ERROR_TYPE.UNKNOWN,
    message: "Something went wrong",
  };
}
