import BookForm from "@/components/admin/forms/BookForm";
import BackButton from "./BackButton";

const CreateBook = () => {
  return (
    <div className="min-h-screen w-full pt-20 pb-8 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        <BackButton to="/admin/books" label="Go to Books" variant="ghost" />
      </div>
      <div className="ml-11">
        <BookForm type="CREATE" />
      </div>
    </div>
  );
};

export default CreateBook;
