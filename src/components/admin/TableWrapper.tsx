import type {
  AccountRequest,
  Pagination,
  Book,
  TableBorrowRecord,
  TableUser,
} from "@/types";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  accountRequestsColumns,
  booksColumns,
  borrowedBooksColumns,
  usersColumns,
} from "./Columns";
import { Button } from "../ui/button";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import { DataTable } from "./DataTable";
import { Link } from "react-router";
import AppPagination from "../books/AppPagination";
import SortFilter from "../shared/SortFilter";

interface TableWrapperProps<T> {
  data: T[];
  meta?: Pagination;
  type: "Books" | "Users" | "BorrowedBooks" | "AccountRequests";
  order?: string;
  setOrder?: (order: string) => void;
  setPage?: (page: number) => void;
}

const TableWrapper = <
  T extends Book | TableUser | TableBorrowRecord | AccountRequest,
>({
  data,
  type,
  meta,
  order,
  setOrder,
  setPage,
}: TableWrapperProps<T>) => {
  const table = useReactTable({
    data: data,
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
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <div className="w-full space-y-6 rounded-xl bg-linear-to-br from-gray-50 to-white p-6 shadow-lg">
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

        <div className="flex gap-2">
          {setOrder && (
            <SortFilter
              icon={<ArrowUpDown className="h-4 w-4" />}
              currentSort={order || "desc"}
              onSortChange={setOrder}
            />
          )}

          {type === "Books" && (
            <Link to={"/admin/books/new"}>
              <Button className="form-btn">
                <PlusCircle /> Create new Book{" "}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="hide-scrollbar overflow-auto md:max-h-125">
          <DataTable
            type={type}
            table={table}
            columns={table.getAllColumns()}
          />
        </div>
      </div>

      {/* Pagination Footer */}
      {meta && setPage && (
        <AppPagination
          totalPage={meta.totalPage}
          currentPage={meta.page}
          setPage={setPage}
        />
      )}
    </div>
  );
};
export default TableWrapper;
