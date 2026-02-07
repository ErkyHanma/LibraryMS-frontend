import { useGetBorrowedBooks } from "@/services/admin/queries";
import { Link } from "react-router";
import { BookOpen, Calendar, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import AdminBookWithUserSkeleton from "../AdminBookWithUserSkeleton";
import type { BorrowRecord } from "@/types";
import UserAvatar from "@/components/shared/UserAvatar";

const BorrowedBooksSection = () => {
  const { data: borrowedBooks, isFetching } = useGetBorrowedBooks("", {
    order: "desc",
  });

  return (
    <section className="flex h-100 max-h-100 w-full flex-col rounded-lg bg-white p-4 shadow-sm md:max-h-88 md:max-w-xl md:min-w-xl">
      <div className="mb-4 flex w-full shrink items-center justify-between">
        <h1 className="text-xl font-[550]">Borrowed Books</h1>
        <Link
          to={"/admin/books-borrowed"}
          className="text-primary cursor-pointer rounded-md bg-gray-50 p-1 px-2 text-sm font-medium shadow transition-colors duration-100 hover:opacity-65 active:scale-95"
        >
          View All
        </Link>
      </div>

      <div className="hide-scrollbar flex h-full flex-col gap-3 overflow-y-scroll">
        {isFetching ? (
          Array.from({ length: 4 }).map((_, i) => (
            <AdminBookWithUserSkeleton key={i} />
          ))
        ) : borrowedBooks.data.length > 0 ? (
          borrowedBooks.data.map((book: BorrowRecord) => (
            <div
              key={book.book.bookId}
              className="shrink rounded-md bg-gray-50 px-4 py-2 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={book.book.coverUrl}
                  alt={book.book.title}
                  className="h-auto w-16 shrink rounded object-cover shadow-sm"
                />
                <div className="relative min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold text-gray-900">
                        {book.book.title}
                      </h4>
                      <p className="truncate text-sm text-gray-500">
                        {book.book.author} • {book.book.categories[0].name}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1 truncate">
                          <UserAvatar
                            fullname={book.user.name + " " + book.user.lastName}
                            profileImageUrl={book.user.profileImageUrl}
                            width={26}
                            height={26}
                            textSize={13}
                          />
                          <span className="truncate">
                            {book.user.name + book.user.lastName}
                          </span>
                        </span>
                        <span className="flex shrink items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(book.borrowDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink flex-col items-center gap-2">
                      <Link
                        to={`/admin/books/${book.book.bookId}`}
                        className="cursor-pointer rounded bg-gray-200 p-2 text-xs font-medium text-gray-600 transition duration-100 hover:bg-gray-300"
                      >
                        <Eye className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="bg-primary/10 flex h-22 w-22 items-center justify-center rounded-full">
              <BookOpen className="size-14 text-white" />
            </div>
            <h3 className="mt-2 mb-1 text-xl font-semibold text-gray-900">
              No Pending Account Requests
            </h3>
            <p className="text-sm text-gray-500">
              There are currently no account requests awaiting approval.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BorrowedBooksSection;
