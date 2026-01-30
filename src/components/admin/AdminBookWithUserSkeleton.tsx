import { Skeleton } from "@/components/ui/skeleton";

const AdminBookWithUserSkeleton = () => {
  return (
    <div className="w-full shrink rounded-md bg-gray-50 px-4 py-2">
      <div className="flex items-start gap-4">
        {/* Book cover */}
        <Skeleton className="h-24 w-16 shrink rounded bg-gray-200" />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {/* Title */}
              <Skeleton className="h-4 w-3/4 bg-gray-200" />

              {/* Author + category */}
              <Skeleton className="mt-2 h-3 w-2/3 bg-gray-200" />

              {/* User + date */}
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
                  <Skeleton className="h-3 w-24 bg-gray-200" />
                </div>

                <Skeleton className="h-3 w-20 bg-gray-200" />
              </div>
            </div>

            {/* Action button */}
            <Skeleton className="h-8 w-8 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookWithUserSkeleton;
