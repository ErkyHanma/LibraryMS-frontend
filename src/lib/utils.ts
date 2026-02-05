import type { BorrowRecord, BorrowStatus } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetYear(date: string): string {
  const FormatDate = new Date(date);
  return FormatDate.getFullYear().toString();
}

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "-";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "-";
  }
};

export const formatDateTime = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "-";
    }

    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "-";
  }
};

export const capitalize = (str: string | null): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function getBorrowStatus(record: BorrowRecord): BorrowStatus {
  const now = new Date();
  const due = new Date(record.dueDate);

  if (record.returnDate) {
    const returned = new Date(record.returnDate);
    return returned > due ? "LATE RETURN" : "RETURNED";
  }

  return now > due ? "OVERDUE" : "BORROWED";
}
