import { useDeleteBook } from "@/services/admin/mutations";
import { Link } from "react-router";
import DialogWrapper from "./DialogWrapper";
import { Edit3, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import type { Book } from "@/types";

// This componet handles book table actions cell
const BookActionsCell = ({ book }: { book: Book }) => {
  const { mutate: deleteBook, isPending } = useDeleteBook();
  const isBorrowed = book.availableCopies < book.totalCopies;

  const handleDeleteBook = () => {
    deleteBook(book.bookId, {
      onSuccess: () => toast.success("Book deleted successfully!"),
      onError: (error: Error) =>
        toast.error(`Unable to delete book: ${error.message}`),
    });
  };

  return (
    <div className="flex items-center gap-1">
      <Link
        to={`/admin/books/edit/${book.bookId}`}
        className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-blue-100"
      >
        <Edit3 className="size-5 text-blue-500" />
      </Link>

      <DialogWrapper
        type={isBorrowed ? "WARNING" : "DANGER"}
        title="Delete Book"
        description={
          isBorrowed
            ? `This book has ${book.totalCopies - book.availableCopies} copy(ies) currently borrowed. All active borrows must be returned before deleting.`
            : "Are you sure you want to permanently delete this book? This action cannot be undone."
        }
        btnText={isPending ? "Deleting..." : "Delete"}
        onConfirm={handleDeleteBook}
        disabled={isBorrowed || isPending}
      >
        <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-red-100">
          <Trash2Icon className="size-5 text-red-500" />
        </button>
      </DialogWrapper>
    </div>
  );
};

export default BookActionsCell;
