import { Skeleton } from "@/components/ui/skeleton";

const BookOverviewSkeleton = () => {
  return (
    <section className="flex w-full flex-col justify-between gap-6 md:flex-row-reverse">
      {/* Image skeleton */}
      <div className="flex w-full flex-1 items-center justify-center">
        <Skeleton className="h-[450px] w-full max-w-xs bg-gray-200" />
      </div>

      {/* Content skeleton */}
      <div className="flex w-full flex-1 flex-col space-y-1">
        {/* Title skeleton */}
        <Skeleton className="mb-4 h-12 w-3/4 bg-gray-200 lg:h-14" />

        {/* Author and category skeleton */}
        <div className="mb-4 flex flex-col gap-2 md:flex-row">
          <Skeleton className="h-6 w-48 bg-gray-200" />
          <Skeleton className="h-6 w-64 bg-gray-200" />
        </div>

        {/* Stats skeleton */}
        <div className="mb-6 flex gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-8 w-12 bg-gray-200" />
          </div>
          <div className="h-auto w-px bg-gray-300" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-8 w-12 bg-gray-200" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-4/5 bg-gray-200" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="mt-2 h-10 w-full bg-gray-200 md:max-w-[250px]" />
      </div>
    </section>
  );
};

export default BookOverviewSkeleton;
