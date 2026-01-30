import BorrowedBookCard from "@/components/books/BorrowedBookCard";
import BorrowedBookCardSkeleton from "@/components/books/BorrowedBookCardSkeleton";
import ProfileSidebar from "@/components/books/ProfileSidebar";
import ProfileSidebarSkeleton from "@/components/books/ProfileSidebarSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import StatCard from "@/components/shared/StatCard";
import StatCardSkeleton from "@/components/shared/StatCardSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import useDebounce from "@/hooks/useDebounce";

import {
  useGetBorrowedRecordsByUserId,
  useGetUserProfile,
} from "@/services/books/queries";
import type { BorrowRecord } from "@/types";

import {
  AlertTriangle,
  ArrowUpDown,
  Bookmark,
  BookOpen,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import AppPagination from "@/components/books/AppPagination";
import SortFilter from "@/components/shared/SortFilter";

type ActiveStatusTabsType = "ALL" | "BORROWED" | "RETURNED" | "OVERDUE";

const Profile = () => {
  const [activeStatusTab, setActiveStatusTab] =
    useState<ActiveStatusTabsType>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");

  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const filters = useMemo(
    () => ({
      page: page,
      lmit: 10, // Default 10
      status: activeStatusTab,
      order: order,
    }),
    [page, order, activeStatusTab],
  );

  const { user } = useAuth();
  const {
    data,
    isLoading,
    error: getProfileError,
  } = useGetUserProfile(user?.id ?? "");

  const {
    data: borrowedRecords,
    isFetching,
    error: getBorrowedRecordsError,
  } = useGetBorrowedRecordsByUserId(
    user?.id ?? "",
    debounceSearchTerm,
    filters,
  );

  const handleStatusChange = (tab: ActiveStatusTabsType) => {
    setActiveStatusTab(tab);
    setPage(1);
  };

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    setPage(1);
  };

  if (getProfileError || getBorrowedRecordsError)
    return <ErrorState message="User not found" />;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Sidebar - Profile Card */}
          {isLoading ? (
            <ProfileSidebarSkeleton />
          ) : (
            <ProfileSidebar user={data} />
          )}

          {/* Main Content Area */}
          <div className="flex w-full flex-col">
            {/* Stats Cards */}
            {isLoading ? (
              <div className="mb-6 flex grid-cols-3 flex-col gap-4 md:grid">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </div>
            ) : (
              <div className="mb-6 flex grid-cols-3 flex-col gap-4 md:grid">
                <StatCard
                  icon={<BookOpen className="h-5 w-5" />}
                  value={data.totalBorrowed}
                  label="Total Borrowed"
                  iconBgColor="bg-blue-100"
                  iconColor="text-blue-600"
                />

                <StatCard
                  icon={<Bookmark className="h-5 w-5" />}
                  value={`${data.currentlyActive}/${data.maxAllowedBooks}`}
                  label="Currently Active"
                  iconBgColor="bg-green-100"
                  iconColor="text-green-600"
                />

                <StatCard
                  icon={<AlertTriangle className="h-5 w-5" />}
                  value={data.overdueBooks}
                  label="Overdue Books"
                  iconBgColor="bg-orange-100"
                  iconColor="text-orange-600"
                />
              </div>
            )}

            {/* Borrowing History Section */}
            <div className="rounded-lg bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Borrowing History
                    </h3>
                    <p className="text-sm text-gray-500">
                      Manage and view book circulation history
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search history..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <SortFilter
                      icon={<ArrowUpDown className="h-4 w-4" />}
                      currentSort={order}
                      onSortChange={handleOrderChange}
                    />
                  </div>
                </div>

                {/* Tabs */}
                <div className="-mb-px flex gap-6 border-gray-200">
                  {(["ALL", "BORROWED", "RETURNED", "OVERDUE"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => handleStatusChange(tab)}
                        className={`relative cursor-pointer pb-3 text-sm font-medium transition-colors ${
                          activeStatusTab === tab
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab === "ALL" && "All History"}
                        {tab === "BORROWED" && "Currently Borrowed"}
                        {tab === "RETURNED" && "Returned"}
                        {tab === "OVERDUE" && "Overdue"}
                        {activeStatusTab === tab && (
                          <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600"></div>
                        )}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Books List */}
              {isFetching ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <BorrowedBookCardSkeleton key={i} />
                ))
              ) : (
                <div className="flex w-full flex-col">
                  <div className="max-h-78.75 divide-y divide-gray-200 overflow-y-auto">
                    {borrowedRecords.data.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <BookOpen className="mb-3 h-12 w-12 text-gray-400" />
                        <p className="font-medium text-gray-600">
                          No records found
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-78.75 divide-y divide-gray-200 overflow-y-auto">
                        {borrowedRecords.data.map((book: BorrowRecord) => (
                          <BorrowedBookCard
                            key={book.book.bookId}
                            book={book}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Pagination */}
                  <div className="flex w-full justify-end border-t border-gray-200 p-6">
                    <div className="w-auto">
                      <AppPagination
                        totalPage={borrowedRecords.meta.totalPage}
                        currentPage={page}
                        setPage={setPage}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
