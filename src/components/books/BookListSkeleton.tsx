import { Skeleton } from "@/components/ui/skeleton";
import BookItemSkeleton from "./BookItemSkeleton";

const BookListSkeleton = () => {
  return (
    <section className="w-full animate-pulse">
      {/* Title */}
      <Skeleton className="h-7 w-48 bg-gray-200" />

      <div className="mt-4 grid grid-cols-2 gap-8 space-y-4 sm:flex sm:gap-6 lg:gap-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <BookItemSkeleton key={i} />
        ))}

        <div className="hidden w-full xl:block">
          <BookItemSkeleton />
        </div>

        {/* Mobile "More books" placeholder */}
        <div className="flex flex-col items-center justify-center gap-3 sm:hidden">
          <Skeleton className="h-24 w-24 rounded-full bg-gray-200" />
          <Skeleton className="h-5 w-24 bg-gray-200" />
        </div>
      </div>
    </section>
  );
};

export default BookListSkeleton;
