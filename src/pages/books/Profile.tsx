import BorrowedBookCard from "@/components/books/BorrowedBookCard";
import ProfileSidebar from "@/components/books/ProfileSidebar";
import StatCard from "@/components/shared/StatCard";
import { mockBorrowedBooks, user1 } from "@/mocks";

import {
  AlertTriangle,
  Bookmark,
  BookOpen,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = {
    totalBorrowed: 42,
    currentlyActive: 2,
    overdueBooks: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Sidebar - Profile Card */}
          <ProfileSidebar user={user1} />

          {/* Main Content Area */}
          <div className="flex w-full flex-col">
            {/* Stats Cards */}
            <div className="mb-6 flex grid-cols-3 flex-col gap-4 md:grid">
              <StatCard
                icon={<BookOpen className="h-5 w-5" />}
                value={stats.totalBorrowed}
                label="Total Borrowed"
                iconBgColor="bg-blue-100"
                iconColor="text-blue-600"
              />

              <StatCard
                icon={<Bookmark className="h-5 w-5" />}
                value={"3/5"}
                label="Currently Active"
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
              />

              <StatCard
                icon={<AlertTriangle className="h-5 w-5" />}
                value={stats.overdueBooks}
                label="Overdue Books"
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
              />
            </div>

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
                    <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50">
                      <Filter className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="-mb-px flex gap-6 border-b border-gray-200">
                  {["all", "borrowed", "returned", "overdue"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative cursor-pointer pb-3 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab === "all" && "All History"}
                      {tab === "borrowed" && "Currently Borrowed"}
                      {tab === "returned" && "Returned"}
                      {tab === "overdue" && "Overdue"}
                      {activeTab === tab && (
                        <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Books List */}
              <div className="divide-y divide-gray-200">
                {mockBorrowedBooks.map((book) => (
                  <BorrowedBookCard key={book.book.bookId} book={book} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-gray-200 p-6">
                <p className="text-sm text-gray-600">
                  Showing 1 to 4 of 42 results
                </p>
                <div className="flex gap-2">
                  <button className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Prev
                  </button>
                  <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
