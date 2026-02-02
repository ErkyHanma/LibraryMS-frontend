import type { AccountRequestStatus, BorrowStatus, NavLink } from "@/types";

// Navigation Links
export const HEADER_NAV_LINKS: NavLink[] = [
  { label: "Home", route: "/home" },
  { label: "Search", route: "/search" },
];

export const BORROWED_BOOK_STATUS_STYLES: Record<
  BorrowStatus,
  { bg: string; text: string }
> = {
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

export const ACCOUNT_REQUEST_STATUS_STYLES: Record<
  AccountRequestStatus,
  { bg: string; text: string }
> = {
  PENDING: {
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
  APPROVED: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  REJECTED: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
};
