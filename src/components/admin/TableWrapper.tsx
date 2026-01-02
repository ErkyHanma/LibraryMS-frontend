import type {
  TableAccountRequest,
  TableBook,
  TableBorrowedBook,
  TableUser,
} from "@/types";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import {
  accountRequestsColumns,
  booksColumns,
  borrowedBooksColumns,
  usersColumns,
} from "./Columns";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "./DataTable";
import { DataTablePagination } from "./DataTablePagination";

interface TableWrapperProps<T> {
  data: T[];
  type: "Books" | "Users" | "BorrowedBooks" | "AccountRequests";
}

const TableWrapper = <
  T extends TableBook | TableUser | TableBorrowedBook | TableAccountRequest,
>({
  data,
  type,
}: TableWrapperProps<T>) => {
  // Mock query
  const query = "";

  // Filter books based on the query
  const filteredData = useMemo(() => {
    return data.filter((each) => {
      const params =
        type === "Users"
          ? `${(each as TableUser).info.name} ${(each as TableUser).email}`
          : type === "Books"
            ? `${(each as TableBook).info.title} ${(each as TableBook).author} ${
                (each as TableBook).categories
              }`
            : type === "BorrowedBooks"
              ? `${(each as TableBorrowedBook).bookInfo.title} `
              : `${(each as TableBorrowedBook).userInfo.name} `;

      return params.toLowerCase().includes(query?.toLowerCase());
    });
  }, [data, query]);

  const table = useReactTable({
    data: filteredData, // Use filtered books
    columns: (type === "Users"
      ? usersColumns
      : type === "Books"
        ? booksColumns
        : type === "BorrowedBooks"
          ? borrowedBooksColumns
          : type === "AccountRequests" && accountRequestsColumns) as ColumnDef<
      T,
      any
    >[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="w-full rounded-lg bg-white p-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">
          {type === "Users"
            ? "All Users"
            : type === "Books"
              ? "All Books"
              : type === "BorrowedBooks"
                ? "Borrow Book Requests"
                : type === "AccountRequests"
                  ? "Account Requested"
                  : ""}
        </h1>

        {type === "Books" && (
          <Button className="form-btn">
            <PlusCircle /> Create new Book{" "}
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto"></div>
        <DataTable type={type} table={table} columns={table.getAllColumns()} />
      </div>

      {/* Pagination Footer */}
      {table.getRowModel().rows?.length > 0 && (
        <div className="mt-4 flex w-full justify-end">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
};
export default TableWrapper;
