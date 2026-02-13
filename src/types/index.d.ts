import type { ReactNode } from "react";

export type UserRole = "USER" | "ADMIN";

export type UserStatus = "PENDING" | "APPROVED" | "BLOCKED";

export type AccountRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Pagination = {
  limit: number;
  page: number;
  total: 2;
  totalPage: 1;
};

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  universityId: string;
  role: UserRole;
  status: UserStatus;
  profileImageUrl?: string;
  joinedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export type EditProfileParams = {
  name: string;
  lastName: string;
  ProfileImageFile?: File;
};

export type AuthUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  universityId: string;
  role: UserRole;
  profileImageUrl?: string;
  status: UserStatus;
};

export interface AccountRequest {
  accountRequestId: number;
  status: AccountRequestStatus;
  rejectionReason?: string;
  reviewedAt?: string;
  reviewedBy?: User;
  createdAt?: string;
  updateAt?: string;
  user: User;
}

export type Category = {
  categoryId: number;
  name: string;
  createdAt: string;
  booksCount: number; // Count of book with this category
};

export interface Book {
  bookId: number;
  title: string;
  author: string;
  categories: Category[];
  description: string;
  summary: string;
  pages: number;
  publishDate: string;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string | null;
}

export interface CreateBookParams {
  title: string;
  author: string;
  categories: number[] | string[];
  description: string;
  publishDate: string;
  coverFile: File;
  totalCopies: number | string;
  availableCopies: number | string;
  pages?: number | string;
  summary: string;
}

export interface EditBookParams {
  title: string;
  author: string;
  categories: number[] | string[];
  description: string;
  publishDate: string;
  coverFile?: File;
  totalCopies: number | string;
  availableCopies: number | string;
  pages: number | string;
  summary: string;
}

export type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE" | "LATE RETURN";

export type BorrowRecord = {
  borrowRecordId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  createdAt: string;
  updateAt?: string;
  book: Book;
  user: User;
};

export interface TableUser extends User {
  borrowedBooksCount: number;
}

export type NavLink = {
  label: string;
  route: string;
};

export type SidebarNavLink = NavLink & {
  image: ReactNode;
};
