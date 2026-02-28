import { AuthContext } from "@/contexts/AuthContext";
import { ApiError } from "@/services/apiError";
import type { AuthUser } from "@/types";
import { useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch current user
  const fetchCurrentUser = async (
    authToken: string,
  ): Promise<AuthUser | null> => {
    try {
      const res = await fetch(`${backendUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        let errorMessage = "Failed to get user data";

        try {
          const errorData = await res.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
          // If JSON parsing fails, use default message
        }

        throw new ApiError(errorMessage, res.status);
      }

      const userData = await res.json();
      return userData;
    } catch (error) {
      console.error("Failed to get user:", error);
      localStorage.removeItem("accessToken");

      // Only show toast for non-401 errors
      if (error instanceof ApiError && error.status !== 401) {
        toast.error(error.getUserMessage());
      }

      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        const userData = await fetchCurrentUser(storedToken);

        if (userData) {
          setToken(storedToken);
          setUser(userData);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse> => {
    try {
      const res = await fetch(`${backendUrl}/auth/login`, {
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

      const result: LoginResponse = await res.json();
      // Validate response structure
      if (!result.accessToken || !result.user) {
        throw new ApiError("Invalid response from server", 500);
      }

      setToken(result.accessToken);
      setUser(result.user);
      localStorage.setItem("accessToken", result.accessToken);

      toast.success("Logged in successfully");

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.getUserMessage());
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }

      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: Boolean(user && token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
