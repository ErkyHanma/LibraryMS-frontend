import type { LoginCredentials } from "@/lib/services/auth/api";
import type { AuthUser } from "@/types";
import { createContext, useContext } from "react";

type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  return context;
};
