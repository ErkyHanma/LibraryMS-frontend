"use client";

import type {
  BorrowedBookStatus,
  ROLE,
  TableAccountRequest,
  TableBook,
  TableBorrowedBook,
  TableUser,
} from "@/types";
import { capitalize, dateConverter } from "@/utils";
import type { ColumnDef } from "@tanstack/react-table";
import UserAvatar from "../shared/UserAvatar";
import { Check, Edit3, ReceiptText, Trash2Icon, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ApproveDialog from "./ApproveDialog";
import RejectDialog from "./RejectDialog";
import { Link } from "react-router";

export const usersColumns: ColumnDef<TableUser>[] = [
  {
    accessorKey: "info",
    header: "Name",
    cell: ({ row }) => {
      const {
        name,
        lastname,
        profileImage,
      }: {
        name: string;
        lastname: string;
        profileImage: string;
      } = row.getValue("info");
      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            name={name + " " + lastname}
            profileImage={profileImage}
          />
          <h5 className="font-semibold">{name + " " + lastname}</h5>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const userRole: ROLE = row.getValue("role");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <span
                className={`${
                  userRole === "USER"
                    ? "bg-pink-50 text-pink-700"
                    : "bg-green-50 text-green-700"
                } rounded-2xl px-2.5 py-0.5 text-sm font-medium`}
              >
                {capitalize(userRole)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex justify-between p-2">
              <span className="rounded-2xl bg-pink-50 px-2.5 py-0.5 text-sm font-medium text-pink-700">
                User
              </span>
              {userRole === "USER" && <Check />}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between p-2">
              <span className="rounded-2xl bg-green-50 px-2.5 py-0.5 text-sm font-medium text-green-700">
                Admin
              </span>

              {userRole === "ADMIN" && <Check />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "booksBorrowed",
    header: "Books Borrowed",
  },
  {
    header: "Action",
    cell: () => {
      return (
        <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-red-100">
          <Trash2Icon className="size-5 text-red-500" />
        </button>
      );
    },
  },
];

export const booksColumns: ColumnDef<TableBook>[] = [
  {
    accessorKey: "info",
    header: "Book Title",
    cell: ({ row }) => {
      const {
        title,
        coverUrl,
      }: {
        title: string;
        coverUrl: string;
      } = row.getValue("info");
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
      const categories: string[] = row.getValue("categories");

      return <>{categories}</>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creation Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const bookId = row.original.bookId;

      return (
        <div className="flex items-center gap-1">
          <Link
            to={`/admin/books/edit/${bookId}`}
            className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-blue-100"
          >
            <Edit3 className="size-5 text-blue-500" />
          </Link>
          <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-red-100">
            <Trash2Icon className="size-5 text-red-500" />
          </button>
        </div>
      );
    },
  },
];

const STATUS_STYLES: Record<BorrowedBookStatus, { bg: string; text: string }> =
  {
    BORROWED: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
    },
    RETURNED: {
      bg: "bg-green-50",
      text: "text-green-700",
    },
    OVERDUE: {
      bg: "bg-red-50",
      text: "text-red-700",
    },
    "LATE RETURN": {
      bg: "bg-pink-50",
      text: "text-pink-700",
    },
  };

export const borrowedBooksColumns: ColumnDef<TableBorrowedBook>[] = [
  {
    accessorKey: "bookInfo",
    header: "Book",
    cell: ({ row }) => {
      const {
        title,
        coverUrl,
      }: {
        title: string;
        coverUrl: string;
      } = row.getValue("bookInfo");
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
    accessorKey: "userInfo",
    header: "User Requested",
    cell: ({ row }) => {
      const {
        name,
        lastname,
        email,
        profileImage,
      }: {
        name: string;
        lastname: string;
        email: string;
        profileImage: string;
      } = row.getValue("userInfo");
      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            name={name + " " + lastname}
            profileImage={profileImage}
          />
          <div className="flex flex-col">
            <h5 className="font-semibold">{name + " " + lastname}</h5>
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
      const status: BorrowedBookStatus = row.getValue("status");

      const currentStyle = STATUS_STYLES[status];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <span
                className={`${
                  currentStyle.bg
                } ${currentStyle.text} rounded-2xl px-2.5 py-0.5 text-sm font-medium`}
              >
                {capitalize(status)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(STATUS_STYLES).map(([key, style]) => (
              <DropdownMenuItem
                key={key}
                className="flex cursor-pointer justify-between p-2"
              >
                <span
                  className={`${style.bg} ${style.text} rounded-2xl px-2.5 py-0.5 text-sm font-medium`}
                >
                  {capitalize(key)}
                </span>

                {status === key && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "borrowDate",
    header: "Borrow Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("borrowDate"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("returnDate"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    header: "Action",
    cell: () => {
      return (
        <button className="bg-primary/10 text-primary hover:bg-primary/15 flex cursor-pointer items-center justify-center gap-1 rounded-full px-2 py-1 font-medium transition duration-100">
          Generate
          <ReceiptText className="size-4" />
        </button>
      );
    },
  },
];

export const accountRequestsColumns: ColumnDef<TableAccountRequest>[] = [
  {
    accessorKey: "userInfo",
    header: "User Requested",
    cell: ({ row }) => {
      const {
        name,
        lastname,
        email,
        profileImage,
      }: {
        name: string;
        lastname: string;
        email: string;
        profileImage: string;
      } = row.getValue("userInfo");
      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            name={name + " " + lastname}
            profileImage={profileImage}
          />
          <div className="flex flex-col">
            <h5 className="font-semibold">{name + " " + lastname}</h5>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "universityId",
    header: "University ID",
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateJoined"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const confirm = () => {};

      return (
        <div className="flex gap-4">
          <ApproveDialog type="ACCOUNT" onConfirm={confirm}>
            <button className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-green-100 p-2 font-medium text-green-700 transition duration-100 hover:bg-green-50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <Check className="size-5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-gray-300 bg-gray-100 fill-gray-200 font-medium text-gray-700">
                  <p>Accept</p>
                </TooltipContent>
              </Tooltip>
            </button>
          </ApproveDialog>

          <RejectDialog type="ACCOUNT" onConfirm={confirm}>
            <button className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-red-100 p-2 font-medium text-red-700 transition duration-100 hover:bg-red-50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <X className="size-5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-gray-300 bg-gray-100 fill-gray-200 font-medium text-gray-700">
                  <p>Decline</p>
                </TooltipContent>
              </Tooltip>
            </button>
          </RejectDialog>
        </div>
      );
    },
  },
];
