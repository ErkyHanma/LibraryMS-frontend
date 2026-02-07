import { ApiError } from "../apiError";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export type SignUpCredentials = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  universityId: string;
};

export async function signUp(credentials: SignUpCredentials) {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    let errorMessage = "Login failed";

    try {
      const errorData = await res.json();

      errorMessage =
        errorData.detail ||
        errorData.message ||
        errorData.title ||
        errorMessage;
    } catch {
      // If JSON parsing fails, rely on ApiError's getUserMessage
    }

    throw new ApiError(errorMessage, res.status);
  }

  const result = await res.json();
  return result;
}
