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
