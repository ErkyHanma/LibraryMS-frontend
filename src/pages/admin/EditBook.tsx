import BookForm from "@/components/admin/forms/BookForm";
import BackButton from "./BackButton";
import { useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useGetBookById } from "@/services/books/queries";

const EditBook = () => {
  const { id } = useParams();

  const { data: book, isFetching } = useGetBookById(id ?? "0");

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-8">
        <p>Book not found</p>
        <BackButton to="/admin/books" label="Go to Books" variant="ghost" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-20 pb-8 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        <BackButton to="/admin/books" label="Go to Books" variant="ghost" />
      </div>
      <div className="ml-11">
        <BookForm type="EDIT" book={book} />
      </div>
    </div>
  );
};

export default EditBook;
