import { useGetBooksByCategoryIdSuspense } from "@/services/books/queries";
import BookList from "./BookList";

// Suspense container component:
// - Fetches the book data using useSuspenseQuery
// - Delegates rendering to the BookOverview presentational component

const BookListByCategoryContainer = ({
  categoryId,
  title,
}: {
  categoryId: number;
  title: string;
}) => {
  const { data: books } = useGetBooksByCategoryIdSuspense(categoryId, 1, 6);
  return <BookList title={title} books={books.data} />;
};

export default BookListByCategoryContainer;
