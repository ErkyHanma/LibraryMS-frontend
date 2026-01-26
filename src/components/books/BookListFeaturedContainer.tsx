import { useGetBooksSuspense } from "@/services/books/queries";
import BookList from "./BookList";

const BookListFeaturedContainer = ({ title }: { title: string }) => {
  const { data: books } = useGetBooksSuspense("", { order: "desc" });

  return <BookList title={title} books={books.data} />;
};

export default BookListFeaturedContainer;
