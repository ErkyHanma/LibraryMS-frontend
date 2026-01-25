import { ApiError } from "../apiError";

type BookFilters = {
  category?: string[];
  author?: string[];
  page?: string;
  limit?: string;
};

// Base API URL from environment
const API_URL = import.meta.env.VITE_BACKEND_URL || "";

export async function getBooks(searchTerm = "", filters: BookFilters = {}) {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays for categories
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/books?${queryString}`
    : `${API_URL}/books`;

  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.title || errorData.message;
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  const data = await response.json();
  return data;
}

export async function getBookById(bookId: number | string) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.title || errorData.message;
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  const data = await response.json();
  return data;
}

export async function getPopularCategories(limit?: number) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const params = new URLSearchParams();
  if (limit) params.append("limit", limit.toString());

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/categories/popular?${queryString}`
    : `${API_URL}/categories/popular`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.title || errorData.message;
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  const data = await response.json();
  return data;
}
