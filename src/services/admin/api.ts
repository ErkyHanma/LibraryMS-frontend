import type {
  AccountRequest,
  AccountRequestStatus,
  Book,
  CategoryParams,
  CreateBookParams,
  EditBookParams,
  UserStatus,
} from "@/types";
import { api } from "../axiosInstance";

type PaginationFilter = {
  order?: string;
  limit?: string;
  page?: string;
};

type FilterWithStatus = PaginationFilter & {
  status?: string;
};

export async function getDashboard() {
  const res = await api.get("/dashboard");
  return res.data;
}

export async function getBooks(
  searchTerm = "",
  filters: PaginationFilter = {},
) {
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
  const url = queryString ? `/books?${queryString}` : `/books`;

  const res = await api.get(url);
  return res.data;
}

export async function getBookById(bookId: number | string): Promise<Book> {
  const res = await api.get(`/books/${bookId}`);
  return res.data;
}

export async function getAccountRequest(
  searchTerm = "",
  filters: FilterWithStatus = {},
) {
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
    ? `/accountRequests?${queryString}`
    : `/accountRequests`;

  const res = await api.get(url);
  return res.data;
}

export async function getAccountRequestById(
  accountRequestId: number,
): Promise<AccountRequest> {
  const res = await api.get(`/accountRequests/${accountRequestId}`);
  return res.data;
}

export async function getBorrowedBooks(
  searchTerm = "",
  filters: FilterWithStatus = {},
) {
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
  const url = queryString ? `/borrowRecords?${queryString}` : `/borrowRecords`;

  const res = await api.get(url);
  return res.data;
}

export async function getUsers(
  searchTerm = "",
  filters: PaginationFilter = {},
) {
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
  const url = queryString ? `/users?${queryString}` : `/users`;

  const res = await api.get(url);
  return res.data;
}

export async function getCategories() {
  const res = await api.get("/categories");
  return res.data;
}

export async function getCategoriesWithPagination(
  searchTerm = "",
  filters: PaginationFilter = {},
) {
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
    ? `/categories/pagination?${queryString}`
    : `/categories/pagination`;

  const res = await api.get(url);
  return res.data;
}

export async function createBook(book: CreateBookParams) {
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("author", book.author);
  formData.append("description", book.description);
  formData.append("summary", book.summary);
  formData.append("publishDate", book.publishDate);
  formData.append("coverFile", book.coverFile);
  formData.append("totalCopies", book.totalCopies.toString());
  formData.append("availableCopies", book.availableCopies.toString());
  if (book.pages) formData.append("pages", book.pages.toString());
  book.categories.forEach((categoryId) => {
    if (!categoryId) return;
    formData.append("categoryIds", categoryId.toString());
  });

  const res = await api.post("/books", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function editBook(bookId: number, book: EditBookParams) {
  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("author", book.author);
  formData.append("description", book.description);
  formData.append("summary", book.summary);
  formData.append("publishDate", book.publishDate);
  formData.append("totalCopies", book.totalCopies.toString());
  formData.append("availableCopies", book.availableCopies.toString());
  formData.append("pages", book.pages.toString());
  if (book.coverFile) formData.append("coverFile", book.coverFile);
  book.categories.forEach((categoryId) => {
    if (!categoryId) return;
    formData.append("categoryIds", categoryId.toString());
  });

  const res = await api.put(`/books/${bookId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteBook(bookId: number) {
  await api.delete(`/books/${bookId}`);
  return true;
}

export async function createCategory(category: CategoryParams) {
  const res = await api.post("/categories", category);
  return res.data;
}

export async function editCategory(
  categoryId: number,
  category: CategoryParams,
) {
  const res = await api.put(`/categories/${categoryId}`, category);
  return res.data;
}

export async function deleteCategory(categoryId: number) {
  await api.delete(`/categories/${categoryId}`);
  return true;
}

export async function changeUserStatus(userId: string, status: UserStatus) {
  await api.patch(`/users/${userId}/change-status`, { status });
  return { success: true };
}

export async function changeUserRole(userId: string, role: string) {
  await api.patch(`/users/${userId}/role`, { role });
  return true;
}

export async function ChangeAccountRequestStatus(
  accountRequestId: number,
  status: AccountRequestStatus,
  userId: string,
  rejectionReason?: string,
) {
  await api.patch(`/accountRequests/${accountRequestId}/change-status`, {
    status,
    userId,
    rejectionReason,
  });
  return { success: true };
}

export async function returnBorrowedBook(borrowedBookId: number) {
  const res = await api.patch(`/borrowRecords/${borrowedBookId}/return`);
  return res.data;
}
