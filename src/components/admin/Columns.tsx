"use client";

import type {
  AccountRequest,
  Book,
  BorrowStatus,
  Category,
  TableBorrowRecord,
  TableUser,
  UserRole,
} from "@/types";
import { capitalize, dateConverter, getBorrowStatus } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import UserAvatar from "../shared/UserAvatar";
import {
  Ban,
  Check,
  Edit3,
  ReceiptText,
  Trash2Icon,
  UserCheck,
  X,
} from "lucide-react";

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
import { Link } from "react-router";
import DialogWrapper from "./DialogWrapper";

export const usersColumns: ColumnDef<TableUser>[] = [
  {
    accessorKey: "info",
    header: "Name",
    cell: ({ row }) => {
      const {
        fullname,
        email,
        profileImage,
      }: {
        fullname: string;
        email: string;
        profileImage: string;
      } = row.getValue("info");
      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar fullname={fullname} profileImageUrl={profileImage} />
          <div className="flex flex-col">
            <h5 className="font-semibold">{fullname}</h5>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
      );
    },
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
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const isBlocked = row.original.status === "BLOCKED";

      return isBlocked ? (
        <DialogWrapper
          type="SUCCESS"
          title="Grant User Access"
          description="Grant the student access to the system. A notification email will be sent."
          btnText="Grant Access & Notify"
          onConfirm={confirm}
        >
          <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-green-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  <UserCheck className="size-5 text-green-500" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
                <p>Grant Access</p>
              </TooltipContent>
            </Tooltip>
          </button>
        </DialogWrapper>
      ) : (
        <DialogWrapper
          type="DANGER"
          title="Restrict User Access"
          description="Restrict the student's access to the system. A notification email will be sent."
          btnText="Restrict Access & Notify"
          onConfirm={confirm}
        >
          <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-red-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  <Ban className="size-5 text-red-500" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
                <p>Restrict Access</p>
              </TooltipContent>
            </Tooltip>
          </button>
        </DialogWrapper>
      );
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
          {categories.map(({ name }: Category) => {
            return <>{name + ", "}</>;
          })}
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

const STATUS_STYLES: Record<BorrowStatus, { bg: string; text: string }> = {
  BORROWED: {
    bg: "bg-status-active",
    text: "text-status-active",
  },
  RETURNED: {
    bg: "bg-status-returned",
    text: "text-status-returned",
  },
  OVERDUE: {
    bg: "bg-status-overdue",
    text: "text-status-overdue",
  },
  "LATE RETURN": {
    bg: "bg-status-lateReturn",
    text: "text-status-lateReturn",
  },
};

export const borrowedBooksColumns: ColumnDef<TableBorrowRecord>[] = [
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
        fullname,
        email,
        profileImage,
      }: {
        fullname: string;
        email: string;
        profileImage: string;
      } = row.getValue("userInfo");
      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar fullname={fullname} profileImageUrl={profileImage} />
          <div className="flex flex-col">
            <h5 className="font-semibold">{fullname}</h5>
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

      const currentStyle = STATUS_STYLES[status];

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
    accessorKey: "borrowedDate",
    header: "Borrowed Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("borrowedDate"));
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
    cell: ({ row }) => {
      const record = row.original;
      const status = getBorrowStatus(record);
      const isReturned = status === "RETURNED" || status === "LATE RETURN";

      return (
        <button
          disabled={isReturned}
          className={`bg-primary/10 text-primary hover:bg-primary/15 flex items-center justify-center gap-1 rounded-full px-2 py-1 font-medium transition duration-100 ${isReturned ? "hover:bg-primary/10 opacity-50" : "cursor-pointer"} `}
        >
          Generate
          <ReceiptText className="size-4" />
        </button>
      );
    },
  },
];

export const accountRequestsColumns: ColumnDef<AccountRequest>[] = [
  {
    accessorKey: "userInfo",
    header: "User Requested",
    cell: ({ row }) => {
      const {
        fullname,
        email,
        profileImage,
      }: {
        fullname: string;
        email: string;
        profileImage: string;
      } = row.getValue("userInfo");
      return (
        <div className="flex flex-row items-center gap-2">
          <UserAvatar fullname={fullname} profileImageUrl={profileImage} />
          <div className="flex flex-col">
            <h5 className="font-semibold">{fullname}</h5>
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
    accessorKey: "createdAt",
    header: "Request Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = dateConverter(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      // const id: string = row.getValue("id");
      const status = row.original.status;

      const confirm = () => {
        // handle confirm using id
      };

      return status === 1 ? (
        <div className="flex gap-3">
          <DialogWrapper
            type="SUCCESS"
            title="Approve Account Request"
            description="Approve the student's account request and grant access. A confirmation email will be sent upon approval."
            btnText="Approve & Send Confirmation"
            onConfirm={confirm}
          >
            <button className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-green-100 p-2 font-medium text-green-700 transition duration-100 hover:bg-green-50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <Check className="size-5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
                  <p>Approve</p>
                </TooltipContent>
              </Tooltip>
            </button>
          </DialogWrapper>

          <DialogWrapper
            type="DANGER"
            title="Reject Account Request"
            description="Reject the student's account request and restrict access. A notification email will be sent upon decision."
            btnText="Reject & Send decision"
            onConfirm={confirm}
          >
            <button className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-red-100 p-2 font-medium text-red-700 transition duration-100 hover:bg-red-50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <X className="size-5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
                  <p>Reject</p>
                </TooltipContent>
              </Tooltip>
            </button>
          </DialogWrapper>
        </div>
      ) : (
        <a
          href={`/admin/account-requests`}
          className="flex cursor-pointer gap-4 rounded-md bg-gray-200 px-3 py-1 transition duration-100 hover:bg-gray-300"
        >
          View
        </a>
      );
    },
  },
];
