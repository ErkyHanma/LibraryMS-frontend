import type {
  AccountRequest,
  AccountRequestStatus,
  Book,
  CreateBookParams,
  EditBookParams,
  UserStatus,
} from "@/types";
import { ApiError } from "../apiError";

type PaginationFilter = {
  order?: string;
  limit?: string;
  page?: string;
};

type FilterWithStatus = PaginationFilter & {
  status?: string;
};

// Base API URL from environment
const API_URL = import.meta.env.VITE_BACKEND_URL || "";

export async function getDashboard() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const response = await fetch(`${API_URL}/dashboard`, {
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

export async function getBooks(
  searchTerm = "",
  filters: PaginationFilter = {},
) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const params = new URLSearchParams();

  if (searchTerm) params.set("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/books?${queryString}`
    : `${API_URL}/books`;

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

export async function getBookById(bookId: number | string): Promise<Book> {
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

export async function getAccountRequest(
  searchTerm = "",
  filters: FilterWithStatus = {},
) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const params = new URLSearchParams();

  if (searchTerm) params.set("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/accountRequests?${queryString}`
    : `${API_URL}/accountRequests`;

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

export async function getAccountRequestById(
  accountRequestId: number,
): Promise<AccountRequest> {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const response = await fetch(
    `${API_URL}/accountRequests/${accountRequestId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

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

export async function getBorrowedBooks(
  searchTerm = "",
  filters: FilterWithStatus = {},
) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const params = new URLSearchParams();

  if (searchTerm) params.set("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/borrowRecords?${queryString}`
    : `${API_URL}/borrowRecords`;

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

export async function getUsers(
  searchTerm = "",
  filters: PaginationFilter = {},
) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const params = new URLSearchParams();

  if (searchTerm) params.set("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/users?${queryString}`
    : `${API_URL}/users`;

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

export async function getCategories() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }
  const response = await fetch(`${API_URL}/categories`, {
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

export async function getCategoriesWithPagination(
  searchTerm = "",
  filters: PaginationFilter = {},
) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const params = new URLSearchParams();

  if (searchTerm) params.set("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const url = queryString
    ? `${API_URL}/categories/pagination?${queryString}`
    : `${API_URL}/categories/pagination`;

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

export async function createBook(book: CreateBookParams) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const formData = new FormData();

  formData.append("title", book.title);
  formData.append("author", book.author);
  formData.append("description", book.description);
  formData.append("summary", book.summary);
  formData.append("publishDate", book.publishDate);
  formData.append("coverFile", book.coverFile);
  formData.append("totalCopies", book.totalCopies.toString());
  formData.append("availableCopies", book.availableCopies.toString());

  if (book.pages) {
    formData.append("pages", book.pages.toString());
  }

  book.categories.forEach((categoryId) => {
    if (!categoryId) return;

    formData.append("categoryIds", categoryId.toString());
  });

  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
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

  const data = await response.json();
  return data;
}

export async function editBook(bookId: number, book: EditBookParams) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const formData = new FormData();

  formData.append("title", book.title);
  formData.append("author", book.author);
  book.categories.forEach((categoryId) => {
    if (!categoryId) return;
    formData.append("categoryIds", categoryId.toString());
  });
  formData.append("description", book.description);
  formData.append("summary", book.summary);
  formData.append("publishDate", book.publishDate);
  if (book.coverFile) formData.append("coverFile", book.coverFile);
  formData.append("totalCopies", book.totalCopies.toString());
  formData.append("availableCopies", book.availableCopies.toString());
  formData.append("pages", book.pages.toString());

  const response = await fetch(`${API_URL}/books/${bookId}`, {
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

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
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

export async function deleteBook(bookId: number) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  return true;
}

export async function deleteCategory(categoryId: number) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const response = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  return true;
}

export async function changeUserStatus(userId: string, status: UserStatus) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const response = await fetch(`${API_URL}/users/${userId}/change-status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  const data = await response.json();
  console.log(data);

  return { success: true };
}

export async function changeUserRole(userId: string, role: string) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const response = await fetch(`${API_URL}/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  const data = await response.json();
  console.log(data);

  return true;
}

export async function ChangeAccountRequestStatus(
  accountRequestId: number,
  status: AccountRequestStatus,
  userId: string,
  rejectionReason?: string,
) {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new ApiError("User not authenticated", 401);

  const response = await fetch(
    `${API_URL}/accountRequests/${accountRequestId}/change-status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, userId, rejectionReason }),
    },
  );

  if (!response.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await response.json();

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, response.status);
  }

  const data = await response.json();
  console.log(data);

  return { success: true };
}

export async function returnBorrowedBook(borrowedBookId: number) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("User not authenticated", 401);
  }

  const res = await fetch(`${API_URL}/borrowRecords/${borrowedBookId}/return`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData = await res.json();

      if (errorData.errors && typeof errorData.errors === "object") {
        const firstError = Object.values(errorData.errors)[0];
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        errorMessage =
          errorData.detail ||
          errorData.title ||
          errorData.message ||
          errorMessage;
      }
    } catch {
      if (import.meta.env.DEV) {
        console.error(errorMessage);
      }
    }

    throw new ApiError(errorMessage, res.status);
  }

  return await res.json();
}
