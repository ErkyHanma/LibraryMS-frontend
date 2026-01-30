import { dateConverter } from "@/lib/utils";
import { useGetRecentBooks } from "@/services/admin/queries";

import type { Book } from "@/types";
import { Calendar, PlusCircle } from "lucide-react";
import { Link } from "react-router";
import AdminBookItemSkeleton from "../AdminBookItemSkeleton";

const RecentBooksSection = () => {
  const { data: recentBooks, isFetching } = useGetRecentBooks();

  return (
    <section className="mb-4 flex max-h-142 w-full flex-col rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-xl font-[550]">Recently added books</h1>
        <Link
          to={"/admin/books"}
          className="text-primary cursor-pointer rounded-md bg-gray-50 p-1 px-2 text-sm font-medium shadow transition-colors duration-100 hover:opacity-65 active:scale-95"
        >
          View All
        </Link>
      </div>

      <Link
        to="/admin/books/new"
        className="group hover:border-primary focus:ring-primary/40 relative mb-2 flex items-center gap-4 rounded-xl border border-dashed border-gray-200 bg-linear-to-br from-gray-50 to-white px-6 py-2 transition-all duration-200 hover:-translate-y-px hover:shadow-md focus:ring-2 focus:outline-none active:translate-y-0"
      >
        <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors group-hover:text-white">
          <PlusCircle className="h-4 w-4" />
        </div>

        <p className="text-base font-medium text-gray-900">Add new book</p>
      </Link>

      <div className="hide-scrollbar flex flex-col gap-3 divide-y overflow-y-auto">
        {isFetching ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <AdminBookItemSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {recentBooks.data.map((book: Book) => (
              <Link
                to={`/admin/books/${book.bookId}`}
                key={book.bookId}
                className="px-2 py-2 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-auto w-14 rounded object-cover shadow-sm"
                  />
                  <div className="relative flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="line-clamp-2 text-base font-semibold text-gray-900">
                          {book.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {book.author} • {book.categories[0].name}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {dateConverter(book.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default RecentBooksSection;
