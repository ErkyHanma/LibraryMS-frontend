import BookListByCategoryContainer from "@/components/books/BookListByCategoryContainer";
import BookListFeaturedContainer from "@/components/books/BookListFeaturedContainer";
import BookListSkeleton from "@/components/books/BookListSkeleton";
import BookOverviewContainer from "@/components/books/BookOverviewContainer";
import BookOverviewSkeleton from "@/components/books/BookOverviewSkeleton";
import { Suspense } from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <main className="w-full p-8 pt-14">
      <div className="mx-auto flex max-w-6xl flex-col space-y-4">
        <Suspense fallback={<BookOverviewSkeleton />}>
          <BookOverviewContainer bookId={49} />
        </Suspense>

        <div className="mt-12 flex flex-col space-y-8">
          <Suspense fallback={<BookListSkeleton />}>
            <BookListFeaturedContainer title={"Discover New Books"} />
          </Suspense>

          <Suspense fallback={<BookListSkeleton />}>
            <BookListByCategoryContainer
              title="Programming Books"
              categoryId={4}
            />
          </Suspense>

          <Suspense fallback={<BookListSkeleton />}>
            <BookListByCategoryContainer
              title="Education Books"
              categoryId={7}
            />
          </Suspense>
        </div>

        <Link
          to={"/search"}
          className="group relative flex h-66 flex-col items-center justify-center gap-3"
        >
          {/* Text */}
          <div className="text-center">
            <p className="group-hover:text-primary text-lg font-semibold text-gray-800 transition-colors duration-200 md:text-2xl">
              Browse the full catalog
            </p>
            <p className="group-hover:text-primary mt-0.5 flex items-center justify-center gap-1 text-sm text-gray-500 transition-colors duration-200 md:text-lg">
              Hundreds of books across all genres
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
