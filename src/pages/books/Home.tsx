import BookListByCategoryContainer from "@/components/books/BookListByCategoryContainer";
import BookListFeaturedContainer from "@/components/books/BookListFeaturedContainer";
import BookListSkeleton from "@/components/books/BookListSkeleton";
import BookOverviewContainer from "@/components/books/BookOverviewContainer";
import BookOverviewSkeleton from "@/components/books/BookOverviewSkeleton";
import { Suspense } from "react";

const Home = () => {
  return (
    <main className="w-full p-8 pt-14">
      <div className="mx-auto flex max-w-6xl flex-col space-y-10">
        <Suspense fallback={<BookOverviewSkeleton />}>
          <BookOverviewContainer bookId={19} />
        </Suspense>

        <Suspense fallback={<BookListSkeleton />}>
          <BookListFeaturedContainer title={"Discover New Books"} />
        </Suspense>

        <Suspense fallback={<BookListSkeleton />}>
          <BookListByCategoryContainer
            title="Programming Books"
            categoryId={4}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
