import type { ReactNode } from "react";

export type UserRole = "USER" | "ADMIN";

export type UserStatus = "PENDING" | "APPROVED" | "BLOCKED";

// export type AccountRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AccountRequestStatus = 1 | 2 | 3;

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

export type AuthUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  universityId: string;
  role: UserRole;
  profileImageUrl?: string;
};

export interface AccountRequest {
  accountRequestId: number;
  status: AccountRequestStatus;
  rejectionReason?: string;
  reviewAt?: string;
  reviewBy?: string;
  createdAt?: string;
  updateAt?: string;
  user: User;
}

export type Category = {
  categoryId: string | number;
  name: string;
};

export interface Book {
  bookId: number | string;
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

export type BorrowStatus = "BORROWED" | "RETURNED" | "OVERDUE" | "LATE RETURN";

export interface TableBorrowRecord {
  userInfo: {
    name: string;
    email: string;
    profileImage: string;
  };
  bookInfo: {
    title: string;
    coverUrl: string;
  };
  status: BorrowStatus;
  borrowedDate: string;
  dueDate: string;
  returnDate?: string | null;
}

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
