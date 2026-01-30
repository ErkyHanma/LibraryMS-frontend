import AccountRequestSection from "@/components/admin/dashboard/AccountRequestSection";
import BorrowedBooksSection from "@/components/admin/dashboard/BorrowedBooksSection";
import RecentBooksSection from "@/components/admin/dashboard/RecentBooksSection";
import StatsSection from "@/components/admin/dashboard/StatsSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full pt-20 md:pt-4">
      {/* Header Section */}
      <div className="">
        <h1 className="text-3xl font-semibold text-gray-900 lg:text-2xl">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Welcome back! Here's what's happening with your library today.
        </p>
      </div>

      <div className="flex flex-col">
        {/* Stats card section */}
        <StatsSection />

        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="flex w-full flex-col gap-4 lg:max-w-[60%]">
            {/* Borrowed Books section */}
            <BorrowedBooksSection />

            {/* Account Requests Section */}
            <AccountRequestSection />
          </div>

          {/* Recently Added Books Section */}
          <RecentBooksSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
