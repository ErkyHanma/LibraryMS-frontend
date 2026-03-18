import axios from "axios";
import { ApiError } from "./apiError";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    console.log(error.response);

    // If 401 and not already retried, attempt refresh
    if (
      status === 401 &&
      error.response.data.Error === "You are not Authorized" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        originalRequest.headers["Authorization"] =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (_refreshError) {
        // Refresh failed — clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(
          new ApiError("Session expired, please log in again", 401),
        );
      }
    }

    // For all other errors, extract message and reject
    let message = "Something went wrong";
    if (error.response?.data) {
      const data = error.response.data;
      message = data.detail || data.title || data.message || message;
    }

    return Promise.reject(new ApiError(message, status));
  },
);
