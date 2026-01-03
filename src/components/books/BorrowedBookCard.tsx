import type { BorrowedBook } from "@/types";
import { Calendar, ReceiptText } from "lucide-react";

const BorrowedBookCard = ({ book }: { book: BorrowedBook }) => {
  return (
    <div
      key={book.book.bookId}
      className="p-6 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start gap-4">
        <img
          src={book.book.coverUrl}
          alt={book.book.title}
          className="h-24 w-16 rounded object-cover shadow-sm"
        />
        <div className="relative flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{book.book.title}</h4>
              <p className="mt-1 text-sm text-gray-500">
                {book.book.author} • {book.book.categories.split(", ")[0]}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Borrowed: {book.borrowedDate}
                </span>
                {book.status === "RETURNED" ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500">
                      <svg
                        fill="currentColor"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Returned: {book.returnedDate}
                  </span>
                ) : book.status === "LATE RETURN" ? (
                  <span className="text-status-lateReturn flex items-center gap-1">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-pink-500">
                      <svg
                        fill="currentColor"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    Returned: {book.returnedDate}
                  </span>
                ) : (
                  <span
                    className={`flex items-center gap-1 ${book.status === "OVERDUE" && "text-status-overdue"}`}
                  >
                    <Calendar className="h-4 w-4" />
                    Due: {book.dueDate}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              {book.status === "RETURNED" ? (
                <span className="bg-status-returned text-status-returned rounded px-3 py-1 text-xs font-medium">
                  Returned
                </span>
              ) : book.status === "OVERDUE" ? (
                <span className="bg-status-overdue text-status-overdue rounded px-3 py-1 text-xs font-medium">
                  Overdue
                </span>
              ) : book.status === "LATE RETURN" ? (
                <span className="bg-status-lateReturn text-status-lateReturn rounded px-3 py-1 text-center text-xs font-medium">
                  Late Return
                </span>
              ) : (
                <>
                  <span className="bg-status-active text-status-active rounded px-3 py-1 text-xs font-medium">
                    Active
                  </span>
                </>
              )}

              <button className="absolute bottom-0 cursor-pointer rounded-md bg-gray-200 p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-300 active:scale-95">
                <ReceiptText className="size-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
