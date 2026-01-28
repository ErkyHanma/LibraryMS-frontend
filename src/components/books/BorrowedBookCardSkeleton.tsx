import { Skeleton } from "@/components/ui/skeleton";

const BorrowedBookCardSkeleton = () => {
  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="h-24 w-16 rounded bg-gray-200" />
        <div className="relative flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Skeleton className="h-6 w-48 bg-gray-200" />
              <Skeleton className="mt-2 h-4 w-64 bg-gray-200" />
              <div className="mt-3 flex items-center gap-4">
                <Skeleton className="h-4 w-40 bg-gray-200" />
                <Skeleton className="h-4 w-36 bg-gray-200" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-20 rounded bg-gray-200" />
              <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBookCardSkeleton;
