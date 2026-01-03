import StatCard from "@/components/shared/StatCard";
import { mockBorrowRequestBooks, mockUsers } from "@/mocks";

import {
  BookMarked,
  // BookOpen,
  Calendar,
  Eye,
  LibraryBig,
  PlusCircle,
  TriangleAlert,
  // UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router";

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
        <section className="mt-2 mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            value={163}
            label="Total Books"
            icon={<LibraryBig />}
          />
          <StatCard
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            value={145}
            label="Borrowed Books"
            icon={<BookMarked />}
          />

          <StatCard
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            value={14}
            label="Overdue Books"
            icon={<TriangleAlert />}
          />

          <StatCard
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            value={317}
            label="Total Users"
            icon={<Users />}
          />
        </section>

        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="flex w-full flex-col gap-4 lg:max-w-[60%]">
            {/* Borrow Books Request section */}
            <section className="flex h-100 max-h-100 w-full flex-col rounded-lg bg-white p-4 shadow-sm md:max-h-88">
              <div className="mb-4 flex w-full shrink items-center justify-between">
                <h1 className="text-xl font-[550]">Borrow Requests</h1>
                <Link
                  to={"/admin/book-requests"}
                  className="text-primary cursor-pointer rounded-md bg-gray-50 p-1 px-2 text-sm font-medium shadow transition-colors duration-100 hover:opacity-65 active:scale-95"
                >
                  View All
                </Link>
              </div>

              <div className="hide-scrollbar flex flex-col gap-3 overflow-y-scroll">
                {mockBorrowRequestBooks.map((book) => (
                  <div
                    key={book.book.bookId}
                    className="shrink rounded-md bg-gray-50 px-4 py-2 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={book.book.coverUrl}
                        alt={book.book.title}
                        className="h-auto w-16 shrink rounded object-cover shadow-sm"
                      />
                      <div className="relative min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate font-semibold text-gray-900">
                              {book.book.title}
                            </h4>
                            <p className="truncate text-sm text-gray-500">
                              {book.book.author} • {book.book.categories[0]}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1 truncate">
                                <img
                                  className="h-6 w-6 shrink rounded-full"
                                  src={book.user.profileImage}
                                  alt=""
                                />
                                <span className="truncate">
                                  {book.user.name + " " + book.user.lastName}
                                </span>
                              </span>
                              <span className="sshrink flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {book.requestDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex shrink flex-col items-center gap-2">
                            <Link
                              to={`/admin/books/${book.book.bookId}`}
                              className="cursor-pointer rounded bg-gray-200 p-2 text-xs font-medium text-gray-600 transition duration-100 hover:bg-gray-300"
                            >
                              <Eye className="size-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Not Borrow Requests View */}
              {/* <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="bg-primary/10 flex h-22 w-22 items-center justify-center rounded-full">
                  <BookOpen className="size-14 text-white" />
                </div>
                <h3 className="mt-2 mb-1 text-xl font-semibold text-gray-900">
                  No Pending Account Requests
                </h3>
                <p className="text-sm text-gray-500">
                  There are currently no account requests awaiting approval.
                </p>
              </div> */}
            </section>

            {/* Account Requests Section */}
            <section className="flex max-h-50 w-full flex-col rounded-lg bg-white px-4 py-4 shadow-sm">
              <div className="mb-4 flex w-full items-center justify-between">
                <h1 className="text-xl font-[550]">Account Requests</h1>
                <Link
                  to={"/admin/account-requests"}
                  className="text-primary cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-sm font-medium shadow transition-colors duration-100 hover:opacity-65 active:scale-95"
                >
                  View All
                </Link>
              </div>

              <div className="hide-scrollbar grid grid-cols-2 gap-4 overflow-y-auto lg:grid-cols-3">
                {mockUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex w-full max-w-80 flex-col items-center rounded-lg bg-gray-50 px-2 py-4"
                  >
                    <img
                      className="h-auto w-12 rounded-full"
                      src={user.profileImage}
                      alt={`User profile image`}
                    />
                    <p className="line-clamp-1 font-medium">
                      {user.name + " " + user.lastName}
                    </p>
                    <p className="max-w-[95%] truncate text-sm text-gray-400">
                      {user.email}
                    </p>
                  </div>
                ))}
              </div>

              {/* Not Account Requests View */}
              {/* <div className="flex flex-col items-center overflow-hidden text-center">
                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                  <UserRound className="size-10 text-white" />
                </div>
                <h3 className="mt-2 mb-1 text-xl font-semibold text-gray-900">
                  No Pending Account Requests
                </h3>
                <p className="text-sm text-gray-500">
                  There are currently no account requests awaiting approval.
                </p>
              </div> */}
            </section>
          </div>

          {/* Recently Added Books Section */}
          <section className="mb-4 flex max-h-142 w-full flex-col rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4 flex w-full items-center justify-between">
              <h1 className="text-xl font-[550]">Recently added books</h1>
              <Link
                to={"/admin/books"}
                className="text-primary cursor-pointer rounded-md bg-gray-50 p-1 px-2 text-sm font-medium shadow transition-colors duration-100 hover:opacity-65 active:scale-95"
              >
                View All
              </Link>
            </div>

            <Link
              to="/admin/books/new"
              className="group hover:border-primary focus:ring-primary/40 relative mb-2 flex items-center gap-4 rounded-xl border border-dashed border-gray-200 bg-linear-to-br from-gray-50 to-white px-6 py-2 transition-all duration-200 hover:-translate-y-px hover:shadow-md focus:ring-2 focus:outline-none active:translate-y-0"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors group-hover:text-white">
                <PlusCircle className="h-4 w-4" />
              </div>

              <p className="text-base font-medium text-gray-900">
                Add new book
              </p>
            </Link>

            <div className="hide-scrollbar flex flex-col gap-3 divide-y overflow-y-auto">
              {mockBorrowRequestBooks.map((book) => (
                <Link
                  to={`/admin/books/${book.book.bookId}`}
                  key={book.book.bookId}
                  className="px-2 py-2 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={book.book.coverUrl}
                      alt={book.book.title}
                      className="h-auto w-14 rounded object-cover shadow-sm"
                    />
                    <div className="relative flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="line-clamp-2 text-base font-semibold text-gray-900">
                            {book.book.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {book.book.author} • {book.book.categories[0]}
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {book.requestDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
