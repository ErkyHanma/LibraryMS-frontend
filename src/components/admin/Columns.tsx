"use client";

import type {
  AccountRequest,
  Book,
  BorrowRecord,
  Category,
  TableUser,
  UserRole,
} from "@/types";
import { capitalize, formatDate, getBorrowStatus } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import UserAvatar from "../shared/UserAvatar";
import { Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BookActionsCell from "./BookActionCell";
import {
  ACCOUNT_REQUEST_STATUS_STYLES,
  BORROWED_BOOK_STATUS_STYLES,
} from "@/constants";
import UserActionCell from "./UserActionCell";
import AccountRequestActionCell from "./AccountRequestActionCell";
import BorrowedBooksActionCell from "./BorrowedBooksActionCell";

export const usersColumns: ColumnDef<TableUser>[] = [
  {
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      const lastName = row.original.lastName;
      const email = row.original.email;
      const profileImageUrl = row.original.profileImageUrl;

      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            fullname={name + " " + lastName}
            profileImageUrl={profileImageUrl}
          />
          <div className="flex flex-col">
            <h5 className="font-semibold">{name + " " + lastName}</h5>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "joinedAt",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedAt"));
      const formattedDate = formatDate(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const userRole: UserRole = row.getValue("role");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <span
                className={`${
                  userRole.toUpperCase() === "USER"
                    ? "text-primary bg-primary/10"
                    : "bg-pink-50 text-pink-700"
                } rounded-2xl px-2.5 py-0.5 text-sm font-medium`}
              >
                {capitalize(userRole)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex justify-between p-2">
              <button className="bg-primary/10 text-primary rounded-2xl px-2.5 py-0.5 text-sm font-medium">
                User
              </button>
              {userRole.toUpperCase() === "USER" && <Check />}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between p-2">
              <button className="rounded-2xl bg-pink-50 px-2.5 py-0.5 text-sm font-medium text-pink-700">
                Admin
              </button>

              {userRole.toUpperCase() === "ADMIN" && <Check />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "borrowedBooksCount",
    header: "Books Borrowed",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusConfig = {
        Approved: {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Approved",
        },
        Blocked: {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Blocked",
        },
        Pending: {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Pending",
        },
      };

      const config = statusConfig[status as keyof typeof statusConfig] || {
        bg: "bg-gray-100",
        text: "text-gray-700",
        label: status,
      };

      return (
        <span
          className={`inline-flex rounded-2xl px-2.5 py-0.5 text-sm font-medium ${config.bg} ${config.text}`}
        >
          {config.label}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const userId = row.original.id;
      const status = row.original.status;
      return <UserActionCell userId={userId} status={status} />;
    },
  },
];

export const booksColumns: ColumnDef<Book>[] = [
  {
    header: "Book Title",
    cell: ({ row }) => {
      const title = row.original.title;
      const coverUrl = row.original.coverUrl;

      return (
        <div className="flex min-w-52 items-center gap-2">
          <img
            className="h-auto w-8 rounded-xs object-cover"
            src={coverUrl}
            alt={`${title} cover`}
          />
          <h5 className="truncate font-semibold">{title}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories: Category[] = row.getValue("categories");

      return (
        <>
          {categories.map((category: Category, i: number) => (
            <span key={category.categoryId}>
              {category.name}
              {i < categories.length - 1 && ", "}
            </span>
          ))}
        </>
      );
    },
  },
  {
    accessorKey: "availableCopies",
    header: "Available Copies",
  },
  {
    header: "View",
    cell: ({ row }) => {
      const bookId = row.original.bookId;

      return (
        <a
          href={`/admin/books/${bookId}`}
          className="flex cursor-pointer gap-4 rounded-md bg-gray-200 px-3 py-1 transition duration-100 hover:bg-gray-300"
        >
          View
        </a>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const bookId = row.original.bookId;
      return <BookActionsCell bookId={bookId} />;
    },
  },
];

export const borrowedBooksColumns: ColumnDef<BorrowRecord>[] = [
  {
    header: "Book",
    cell: ({ row }) => {
      const title = row.original.book.title;
      const coverUrl = row.original.book.coverUrl;
      return (
        <div className="flex items-center gap-2">
          <img
            className="h-auto w-8 rounded-xs object-cover"
            src={coverUrl}
            alt={`${title} cover`}
          />
          <h5 className="truncate font-semibold">{title}</h5>
        </div>
      );
    },
  },
  {
    header: "User",
    cell: ({ row }) => {
      const name = row.original.user.name;
      const lastName = row.original.user.lastName;
      const email = row.original.user.email;
      const profileImageUrl = row.original.user.profileImageUrl;

      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            fullname={name + " " + lastName}
            profileImageUrl={profileImageUrl}
          />
          <div className="flex flex-col">
            <h5 className="font-semibold">{name + " " + lastName}</h5>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const record = row.original;
      const status = getBorrowStatus(record);

      const currentStyle = BORROWED_BOOK_STATUS_STYLES[status];

      return (
        <div>
          <span
            className={`${
              currentStyle.bg
            } ${currentStyle.text} rounded-2xl px-2.5 py-0.5 text-sm font-medium`}
          >
            {capitalize(status)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "borrowDate",
    header: "Borrowed Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("borrowDate"));
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("returnDate"));

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("dueDate"));
      return <div>{formattedDate}</div>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const record = row.original;
      const id = row.original.borrowRecordId;
      const status = getBorrowStatus(record);

      return <BorrowedBooksActionCell borrowedBookId={id} status={status} />;
    },
  },
];

export const accountRequestsColumns: ColumnDef<AccountRequest>[] = [
  {
    accessorKey: "userInfo",
    header: "User Requested",
    cell: ({ row }) => {
      if (!row.original.user) return;

      const name = row.original.user.name ?? "";
      const lastName = row.original.user.lastName ?? "";
      const email = row.original.user.email ?? "";
      const profileImageUrl = row.original.user.profileImageUrl ?? "";

      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            fullname={name + " " + lastName}
            profileImageUrl={profileImageUrl}
          />
          <div className="flex flex-col">
            <h5 className="font-semibold">{name + " " + lastName}</h5>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "University ID",
    cell: ({ row }) => {
      if (!row.original.user) return;
      const universityId = row.original.user.universityId;

      return <div>{universityId}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Request Date",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("createdAt"));
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toUpperCase();
      const currentStyle = ACCOUNT_REQUEST_STATUS_STYLES[status];

      return (
        <div>
          <span
            className={`${
              currentStyle.bg
            } ${currentStyle.text} rounded-2xl px-2.5 py-0.5 text-sm font-medium`}
          >
            {capitalize(status)}
          </span>
        </div>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.accountRequestId;
      const status = row.original.status;
      return <AccountRequestActionCell accountRequestId={id} status={status} />;
    },
  },
];
