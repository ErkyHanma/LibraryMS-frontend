import BookForm from "@/components/admin/forms/BookForm";
import BackButton from "./BackButton";
import { mockBook, mockBooks } from "@/mocks";
import { useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams();

  const book = mockBooks.find((book) => book.bookId === id) || mockBook;

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
