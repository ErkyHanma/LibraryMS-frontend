import { useGetBooksByCategoryIdSuspense } from "@/services/books/queries";
import type { Book } from "@/types";

interface SimilarBooksProps {
  categoryId: number;
  currentBookId: number;
}

const SimilarBooks = ({ categoryId, currentBookId }: SimilarBooksProps) => {
  const page = 1;
  const limit = 6;

  const { data: similarBooks } = useGetBooksByCategoryIdSuspense(
    categoryId,
    page,
    limit,
  );

  // filter current book
  const filteredBooks =
    similarBooks?.data?.filter((book: Book) => book.bookId !== currentBookId) ||
    [];

  if (filteredBooks.length === 0) {
    return <p className="text-sm text-gray-400">No similar books found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {filteredBooks.map(({ bookId, coverUrl, title }: Book) => (
        <a
          href={`/book/${bookId}`}
          className="w-full cursor-pointer transition hover:opacity-80"
          key={bookId}
        >
          <img
            className="h-68 md:h-48 w-full object-contain "
            src={coverUrl}
            alt={`${title} cover`}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
};

export default SimilarBooks;
