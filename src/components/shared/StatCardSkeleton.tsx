import { Skeleton } from "@/components/ui/skeleton";

const StatCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-8 w-16 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
