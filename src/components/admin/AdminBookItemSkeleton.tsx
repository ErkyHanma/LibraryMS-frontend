import { Skeleton } from "@/components/ui/skeleton";

const AdminBookItemSkeleton = () => {
  return (
    <div className="px-2 py-2">
      <div className="flex items-start gap-4">
        {/* Cover */}
        <Skeleton className="h-20 w-14 rounded bg-gray-200" />

        <div className="flex-1">
          {/* Title */}
          <Skeleton className="h-4 w-3/4 rounded bg-gray-200" />
          <Skeleton className="mt-2 h-4 w-2/3 rounded bg-gray-200" />

          {/* Author + Category */}
          <Skeleton className="mt-2 h-3 w-1/2 rounded bg-gray-200" />

          {/* Date */}
          <Skeleton className="mt-4 h-3 w-32 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default AdminBookItemSkeleton;
