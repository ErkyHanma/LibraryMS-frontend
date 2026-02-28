import { Suspense } from "react";
import BookOverview from "@/components/books/BookOverview";
import { ErrorState } from "@/components/shared/ErrorState";
import { Spinner } from "@/components/ui/spinner";
import type { ApiError } from "@/services/apiError";
import { useGetBookById } from "@/services/books/queries";
import { useParams } from "react-router";
import SimilarBooks from "@/components/books/SimilarBooks";
import BookOverviewSkeleton from "@/components/books/BookOverviewSkeleton";

const BookDetails = () => {
  const { id } = useParams();
  if (!id) throw new Error("Book ID is required");

  const { data: book, isFetching, error, refetch } = useGetBookById(id);

  if (error) {
    return (
      <ErrorState onRetry={refetch} message={(error as ApiError).message} />
    );
  }

  if (isFetching) {
    return (
      <main className="w-full p-8 pt-14">
        <div className="mx-auto flex max-w-6xl flex-col space-y-10">
          <BookOverviewSkeleton />
        </div>
      </main>
    );
  }

  // Get first category ID from book
  const firstCategoryId = book?.categories?.[0]?.categoryId;

  return (
    <main className="w-full p-8 pt-14">
      <div className="mx-auto flex max-w-6xl flex-col space-y-10">
        <div className="mb-20 w-full flex-3">
          <BookOverview book={book} />
        </div>

        <section className="flex w-full flex-col justify-between gap-16 md:flex-row md:gap-24 lg:gap-36">
          {/* Summary */}
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-2xl font-semibold">Summary</h1>
            <div className="space-y-4 text-base">
              {book.summary.split("\n").map((line: string, i: number) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <h1 className="text-2xl font-semibold">Similar Books</h1>
            {firstCategoryId ? (
              <Suspense
                fallback={
                  <div className="flex h-64 w-full items-center justify-center">
                    <Spinner className="size-6" />
                  </div>
                }
              >
                <SimilarBooks
                  categoryId={firstCategoryId}
                  currentBookId={book.bookId}
                />
              </Suspense>
            ) : (
              <p className="text-sm text-gray-400">
                No similar books available
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookDetails;
