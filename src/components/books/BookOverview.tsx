import type { Book } from "@/types";
import BorrowBookBtnAction from "./BorrowBookBtnAction";
import { Link } from "react-router";
import { Button } from "../ui/button";

type Props = {
  book: Book;
  isHome?: boolean;
};

const BookOverview = ({ book, isHome = false }: Props) => {
  const {
    bookId,
    title,
    author,
    coverUrl,
    categories,
    description,
    availableCopies,
    totalCopies,
  } = book;

  return (
    <section className="flex w-full flex-col items-start justify-between gap-6 md:flex-row-reverse">
      <Link
        to={`/book/${bookId}`}
        className="flex w-full flex-2 items-center justify-center"
      >
        <div className="relative flex w-full justify-center">
          {/* Blurred Background */}
          <img
            className="absolute top-8 right-4 h-auto max-h-110 min-h-90 w-full max-w-xs rotate-z-12 opacity-60 blur-sm max-sm:hidden"
            src={coverUrl}
            alt="Book cover background"
          />

          <img
            className="relative z-10 h-auto max-h-110 min-h-90 w-full max-w-xs object-cover"
            src={coverUrl}
            alt="Book cover"
          />
        </div>
      </Link>

      {/* Book details */}
      <div className="relative z-10 flex w-full flex-3 flex-col justify-center space-y-2">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.categoryId}
              className="rounded-full border border-white/20 bg-black/10 px-3 py-1 text-xs font-medium tracking-widest backdrop-blur-sm"
            >
              {c.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
          {title}
        </h1>

        {/* Author */}
        <p className="my-2 text-lg">
          By <span className="text-primary font-semibold">{author}</span>
        </p>

        <div className="mb-6 h-px w-16 bg-gray-300" />

        {/* Stats */}
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-widest uppercase">
              Total Copies
            </span>
            <span className="text-primary text-3xl font-bold">
              {totalCopies}
            </span>
          </div>

          <div className="h-auto w-px" />

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-widest uppercase">
              Available
            </span>
            <span className="text-3xl font-bold text-emerald-400">
              {availableCopies}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-4 max-w-prose text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex gap-4 pt-2">
          <BorrowBookBtnAction bookId={bookId} bookTitle={title} />
          {isHome && (
            <Link to={"/search"}>
              <Button className="px-3 py-5 sm:px-6" variant={"outline"}>
                Discover all books
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
