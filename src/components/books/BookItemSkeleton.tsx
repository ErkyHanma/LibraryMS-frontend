import { Skeleton } from "@/components/ui/skeleton";

const BookItemSkeleton = () => {
  return (
    <div className="w-full max-w-58 transition duration-200">
      <Skeleton className="h-55 w-full rounded-md bg-gray-200" />
      <div className="mt-2 space-y-1">
        <Skeleton className="h-4 w-3/4 bg-gray-200" />

        <Skeleton className="h-3 w-1/2 bg-gray-200" />
      </div>
    </div>
  );
};

export default BookItemSkeleton;
