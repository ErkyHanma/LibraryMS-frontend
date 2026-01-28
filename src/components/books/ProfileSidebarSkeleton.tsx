import { Skeleton } from "@/components/ui/skeleton";

const ProfileSidebarSkeleton = () => {
  return (
    <div className="w-full md:max-w-75 lg:max-w-87.5">
      <div className="sticky top-22 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <Skeleton className="mb-4 h-32 w-32 rounded-full bg-gray-200" />
          <Skeleton className="h-6 w-40 bg-gray-200" />
          <Skeleton className="mt-3 h-6 w-28 rounded-full bg-gray-200" />
        </div>

        <div className="mt-6 space-y-4 border-t pt-6">
          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 h-5 w-5 bg-gray-200" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-3 w-12 bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 h-5 w-5 bg-gray-200" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-3 w-20 bg-gray-200" />
              <Skeleton className="h-4 w-24 bg-gray-200" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton className="mt-0.5 h-5 w-5 bg-gray-200" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-3 w-24 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebarSkeleton;
