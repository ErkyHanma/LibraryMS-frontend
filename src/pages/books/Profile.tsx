import ProfileSidebar from "@/components/books/ProfileSidebar";
import StatCard from "@/components/shared/StatCard";
import { mockBorrowedBooks, student2 as student } from "@/constants";

import {
  AlertTriangle,
  Bookmark,
  BookOpen,
  Calendar,
  Filter,
  ReceiptText,
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
          <ProfileSidebar student={student} />

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
                value={150}
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
                  <div
                    key={book.book.id}
                    className="p-6 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={book.book.image}
                        alt={book.book.title}
                        className="h-24 w-16 rounded object-cover shadow-sm"
                      />
                      <div className="relative flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {book.book.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {book.book.author} • {book.book.categories[0]}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Borrowed: {book.borrowedDate}
                              </span>
                              {book.status === "returned" ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                                    <svg
                                      fill="currentColor"
                                      className="h-3 w-3 text-white"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                  Returned: {book.returnedDate}
                                </span>
                              ) : (
                                <span
                                  className={`flex items-center gap-1 ${book.status === "overdue" ? "text-orange-600" : "text-blue-600"}`}
                                >
                                  <Calendar className="h-4 w-4" />
                                  Due: {book.dueDate}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            {book.status === "returned" ? (
                              <span className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                Returned
                              </span>
                            ) : book.status === "overdue" ? (
                              <span className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                Overdue
                              </span>
                            ) : (
                              <>
                                <span className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                  Active
                                </span>
                              </>
                            )}

                            <button className="absolute bottom-0 cursor-pointer rounded-md bg-gray-200 p-2 transition-all duration-200 hover:scale-105 hover:bg-gray-300 active:scale-95">
                              <ReceiptText className="size-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
