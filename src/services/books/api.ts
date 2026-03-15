import type { EditProfileParams } from "@/types";
import { api } from "../axiosInstance";

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

export async function getBooks(searchTerm = "", filters: BookFilters = {}) {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const res = await api.get("/books", { params });
  return res.data;
}

export async function getBookById(bookId: number | string) {
  const res = await api.get(`/books/${bookId}`);
  return res.data;
}

export async function getPopularCategories(limit?: number) {
  const params = new URLSearchParams();
  if (limit) params.append("limit", limit.toString());

  const res = await api.get("/categories/popular", { params });
  return res.data;
}

export async function getBooksByCategoryId(
  categoryId: number,
  page?: number,
  limit?: number,
) {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  const res = await api.get(`/books/category/${categoryId}`, { params });
  return res.data;
}

export async function getUserProfile(userId: string) {
  const res = await api.get(`/users/${userId}/profile`);
  return res.data;
}

export async function getBorrowedBookByUserId(
  userId: string,
  searchTerm = "",
  filters: BorrowRecordFilter = {},
) {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  const url = queryString
    ? `/borrowRecords/user/${userId}?${queryString}`
    : `/borrowRecords/user/${userId}`;

  const res = await api.get(url);
  return res.data;
}

export async function BorrowBookAction(BookId: number, userId: string) {
  const res = await api.post("/borrowRecords", { bookId: BookId, userId });
  return res.data;
}

export async function EditProfile(userId: string, params: EditProfileParams) {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("lastName", params.lastName);
  if (params.ProfileImageFile) {
    formData.append("profileImageFile", params.ProfileImageFile);
  }

  const res = await api.put(`/users/${userId}/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
