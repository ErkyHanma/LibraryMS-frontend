import type { Book } from "@/types";
import { Link } from "react-router";
import BookItem from "./BookItem";

type BookList = {
  title: string;
  books: Book[];
};

const BookList = ({ title, books }: BookList) => {
  return (
    <section className="w-full">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 space-y-4 sm:flex md:gap-12">
        {/* Show only 5 books*/}
        {books.slice(0, 5).map((book) => (
          <BookItem key={book.id} book={book} />
        ))}

        {/* 6th book - only visible on large screens */}
        {books.length > 5 && (
          <div className="hidden w-full xl:block">
            <BookItem key={books[5].id} book={books[5]} />
          </div>
        )}
        <Link
          to={"/search"}
          className="flex flex-col items-center justify-center gap-3 sm:hidden"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-700">More books</p>
        </Link>
      </div>
    </section>
  );
};

export default BookList;
