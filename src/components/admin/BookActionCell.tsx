import { useDeleteBook } from "@/services/admin/mutations";
import { Link } from "react-router";
import DialogWrapper from "./DialogWrapper";
import { Edit3, Trash2Icon } from "lucide-react";

// This componet handles book table actions cell
const BookActionsCell = ({ bookId }: { bookId: number }) => {
  const { mutate: deleteBook, isPending } = useDeleteBook();

  return (
    <div className="flex items-center gap-1">
      <Link
        to={`/admin/books/edit/${bookId}`}
        className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-blue-100"
      >
        <Edit3 className="size-5 text-blue-500" />
      </Link>

      <DialogWrapper
        type="DANGER"
        title="Delete Book"
        description="Are you sure you want to delete this book permanently?"
        btnText={isPending ? "Deleting..." : "Delete"}
        onConfirm={() => deleteBook(bookId)}
        disabled={isPending}
      >
        <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-red-100">
          <Trash2Icon className="size-5 text-red-500" />
        </button>
      </DialogWrapper>
    </div>
  );
};

export default BookActionsCell;
