import { AuthContext } from "@/contexts/AuthContext";
import { ApiError } from "@/services/apiError";
import { api } from "@/services/axiosInstance";
import type { AuthUser } from "@/types";
import axios from "axios";
import { useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchCurrentUser = async (): Promise<AuthUser | null> => {
    try {
      const res = await api.get("/auth/me");
      return res.data;
    } catch (error) {
      console.error("Failed to get user:", error);
      localStorage.removeItem("accessToken");

      // Only show toast for non-401 errors (401 means token just expired)
      if (error instanceof ApiError && error.status !== 401) {
        toast.error(error.getUserMessage());
      }

      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedToken) {
        const userData = await fetchCurrentUser();
        if (userData) {
          setToken(storedToken);
          setUser(userData);
        }
      } else if (storedRefreshToken) {
        // No access token but refresh token exists — try to get a new access token
        try {
          const res = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken: storedRefreshToken,
          });

          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          setToken(res.data.accessToken);
          setUser(res.data.user); // only if refresh endpoint returns the user

          if (user?.role.toUpperCase() === "ADMIN") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/home";
          }
        } catch {
          // Refresh token is invalid/expired — clear everything
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse | null> => {
    try {
      const res = await api.post("/auth/login", credentials);

      setToken(res.data.accessToken);
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      toast.success("Logged in successfully");
      return res.data;
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.getUserMessage());
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }

      console.error("Login failed:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/revoke");
    } catch (error) {
      // Log but don't block logout — always clear local state
      console.error("Revoke request failed:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully");
    }
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
