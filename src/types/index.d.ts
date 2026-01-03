import type { ReactNode } from "react";

export type NavLink = {
  label: string;
  route: string;
};

export type SidebarNavLink = NavLink & {
  image: ReactNode;
};

export type BorrowedBookStatus =
  | "ACTIVE"
  | "RETURNED"
  | "LATE RETURN"
  | "OVERDUE";

export interface Book {
  bookId: string;
  title: string;
  author: string;
  categories: string;
  description: string;
  summary: string;
  pages: number;
  date: string;
  coverUrl?: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: string | null;
}

export type BorrowedBook = {
  book: Book;
  borrowedDate: string;
  dueDate: string;
  returnedDate?: string;
  status: BorrowedBookStatus;
};

export type ROLE = "USER" | "ADMIN" | null;

export interface User {
  id: string;
  name: string;
  lastName: string;
  profileImage?: string;
  email: string;
  role: ROLE;
  createdAt: string;
  universityId: string;
}

export interface TableUser extends User {
  info: {
    name: string;
    lastname: string;
    profileImage: string;
  };
  dateJoined: string;
  booksBorrowed: number;
}

export interface TableBook extends Book {
  info: {
    title: string;
    coverUrl: string;
  };
}

export type BorrowedBookStatus =
  | "BORROWED"
  | "RETURNED"
  | "LATE RETURN"
  | "OVERDUE";

export interface TableBorrowedBook {
  userInfo: {
    name: string;
    lastname: string;
    email: string;
    profileImage: string;
  };
  bookInfo: {
    title: string;
    coverUrl: string;
  };
  status: BorrowedBookStatus;
  borrowDate: string;
  returnDate: string;
  dueDate: string;
}

export interface TableAccountRequest {
  userInfo: {
    name: string;
    lastname: string;
    email: string;
    profileImage: string;
  };
  dateJoined: string;
  universityId: string;
}
