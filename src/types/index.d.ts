export type NavLink = {
  label: string;
  href: string;
};

export type Book = {
  title: string;
  author: string;
  categories: string[];
  description: string;
  pages: number;
  date: string;
  image?: string;
};
