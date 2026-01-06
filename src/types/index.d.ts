import type { ReactNode } from "react";

export type UserRole = "USER" | "ADMIN";

export type UserStatus = "PENDING" | "APPROVED" | "BLOCKED";

export type AccountRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  fullname: string;
  email: string;
  universityId: string;
  role: UserRole;
  status: UserStatus;
  profileImage?: string;
  dateJoined?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AccountRequest {
  userInfo: {
    fullname: string;
    email: string;
    profileImage: string;
  };
  status: AccountRequestStatus;
  universityId: string;
  createdAt?: string;
}

export interface Book {
  bookId: string;
  title: string;
  author: string;
  categories: string;
  description: string;
  summary: string;
  pages: number;
  publishDate: string;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string | null;
}

export type BorrowState = "BORROWED" | "RETURNED" | "OVERDUE" | "LATE RETURN";

export interface TableBorrowRecord {
  userInfo: {
    fullname: string;
    email: string;
    profileImage: string;
  };
  bookInfo: {
    title: string;
    coverUrl: string;
  };
  status: BorrowState;
  borrowedDate: string;
  dueDate: string;
  returnDate?: string | null;
}

export type BorrowRecord = {
  book: Book;
  borrowedDate: string;
  dueDate: string;
  returnDate?: string;
  status: BorrowState;
};

export interface TableUser extends User {
  info: {
    fullname: string;
    email: string;
    profileImage: string;
  };
  booksBorrowed: number;
}

export interface TableBook extends Book {
  info: {
    title: string;
    coverUrl: string;
  };
}

export type NavLink = {
  label: string;
  route: string;
};

export type SidebarNavLink = NavLink & {
  image: ReactNode;
};
