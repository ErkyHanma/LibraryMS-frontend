export type NavLink = {
  label: string;
  href: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  categories: string[];
  description: string;
  summary: string;
  pages: number;
  date: string;
  image?: string;
};

export type BorrowedBook = {
  book: Book;
  borrowedDate: string;
  dueDate: string;
  returnedDate?: string;
  status: "active" | "returned" | "overdue";
};

export type Student = {
  id: string;
  name: string;
  lastName: string;
  profileImage: string;
  email: string;
  studentId: string;
};
