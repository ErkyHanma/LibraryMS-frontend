import { useGetBookByIdSuspense } from "@/services/books/queries";
import BookOverview from "./BookOverview";

type Props = {
  bookId: number;
};

// Suspense container component:
// - Fetches the book data using useSuspenseQuery
// - Delegates rendering to the BookOverview presentational component

const BookOverviewContainer = ({ bookId }: Props) => {
  const { data: book } = useGetBookByIdSuspense(bookId);
  return <BookOverview book={book} />;
};

export default BookOverviewContainer;
