import StatCard from "@/components/shared/StatCard";
import StatCardSkeleton from "@/components/shared/StatCardSkeleton";
import { useGetDashboard } from "@/services/admin/queries";
import { BookMarked, LibraryBig, TriangleAlert, Users } from "lucide-react";

const StatsSection = () => {
  const { data: stats, isFetching } = useGetDashboard();

  return (
    <section className="mt-2 mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {isFetching ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        <>
          <StatCard
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            value={stats.totalBooks}
            label="Total Books"
            icon={<LibraryBig />}
          />
          <StatCard
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            value={stats.totalBorrowedRecords}
            label="Borrowed Books"
            icon={<BookMarked />}
          />
          <StatCard
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            value={stats.totalOverdueBooks}
            label="Overdue Books"
            icon={<TriangleAlert />}
          />
          <StatCard
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            value={stats.totalUsers}
            label="Total Users"
            icon={<Users />}
          />
        </>
      )}
    </section>
  );
};

export default StatsSection;
