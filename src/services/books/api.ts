import type { EditProfileParams } from "@/types";
import { ApiError } from "../apiError";

type BookFilters = {
  category?: string[];
  author?: string[];
  page?: string;
  limit?: string;
};

type BorrowRecordFilter = {
  order?: string;
  status?: string;
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

export async function getBooksByCategoryId(
  categoryId: number,
  page?: number,
  limit?: number,
) {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/books/category/${categoryId}?${queryString}`
    : `${API_URL}//books/category/${categoryId}`;

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

export async function getUserProfile(userId: string) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const response = await fetch(`${API_URL}/users/${userId}/profile`, {
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

export async function getBorrowedBookByUserId(
  userId: string,
  searchTerm = "",
  filters: BorrowRecordFilter = {},
) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

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
    ? `${API_URL}/borrowRecords/user/${userId}?${queryString}`
    : `${API_URL}/borrowRecords/user/${userId}`;

  const response = await fetch(`${url}`, {
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

export async function BorrowBookAction(BookId: number, userId: string) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const response = await fetch(`${API_URL}/borrowRecords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId: BookId, userId: userId }),
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

export async function EditProfile(userId: string, params: EditProfileParams) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const formData = new FormData();

  formData.append("name", params.name);
  formData.append("lastName", params.lastName);
  if (params.ProfileImageFile) {
    formData.append("profileImageFile", params.ProfileImageFile);
  }

  const response = await fetch(`${API_URL}/users/${userId}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

  return await response.json();
}
