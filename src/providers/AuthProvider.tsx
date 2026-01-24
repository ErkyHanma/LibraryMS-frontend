import { AuthContext } from "@/contexts/AuthContext";
import type { AuthUser } from "@/types";
import { useState, useEffect, type ReactNode } from "react";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch current user from backend
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
        const error = await res.json();
        throw new Error(error.detail ?? "Error has occured");
      }

      const userData = await res.json();
      return userData;
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      localStorage.removeItem("accessToken");
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
        const error = await res.json();
        throw new Error(error.detail);
      }

      const result: LoginResponse = await res.json();

      // Store token and user in state and localStorage
      setToken(result.accessToken);
      setUser(result.user);
      localStorage.setItem("accessToken", result.accessToken);

      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
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
