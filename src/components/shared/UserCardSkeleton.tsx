import { Skeleton } from "@/components/ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <div className="flex w-full max-w-80 flex-col items-center rounded-lg bg-gray-50 px-2 py-3">
      {/* Avatar */}
      <Skeleton className="h-14 w-14 rounded-full bg-gray-200" />

      {/* Name */}
      <Skeleton className="mt-2 h-4 w-32 bg-gray-200" />

      {/* Email */}
      <Skeleton className="mt-2 h-3 w-44 bg-gray-200" />
    </div>
  );
};

export default UserCardSkeleton;
