import type {
  AccountRequest,
  Pagination,
  Book,
  BorrowRecord,
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
  categoriesColumns,
  usersColumns,
} from "./Columns";
import { Button } from "../ui/button";
import {
  AlertCircle,
  ArrowUpDown,
  Ban,
  BookCheck,
  BookOpen,
  CheckCircle,
  Clock,
  Hourglass,
  ListFilter,
  PlusCircle,
  UserCheck,
  XCircle,
} from "lucide-react";
import { DataTable } from "./DataTable";
import { Link } from "react-router";
import AppPagination from "../books/AppPagination";
import SortFilter from "../shared/SortFilter";
import type { ReactNode } from "react";
import CategoryForm from "./forms/CategoryForm";

interface TableWrapperProps<T> {
  data: T[];
  meta?: Pagination;
  type: "Books" | "Users" | "BorrowedBooks" | "AccountRequests" | "Categories";
  order?: string;
  setOrder?: (order: string) => void;
  status?: string;
  setStatus?: (status: string) => void;
  setPage?: (page: number) => void;
}

const STATUS_FILTER_CONFIGS: Record<
  string,
  { value: string; label: string; icon: ReactNode }[]
> = {
  Users: [
    {
      value: "Approved",
      label: "Approved",
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      value: "Blocked",
      label: "Blocked",
      icon: <Ban className="h-4 w-4" />,
    },
  ],
  BorrowedBooks: [
    {
      value: "BORROWED",
      label: "Borrowed",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      value: "RETURNED",
      label: "Returned",
      icon: <BookCheck className="h-4 w-4" />,
    },
    {
      value: "OVERDUE",
      label: "Overdue",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      value: "LATE RETURN",
      label: "Late Return",
      icon: <Clock className="h-4 w-4" />,
    },
  ],
  AccountRequests: [
    {
      value: "PENDING",
      label: "Pending",
      icon: <Hourglass className="h-4 w-4" />,
    },
    {
      value: "APPROVED",
      label: "Approved",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      icon: <XCircle className="h-4 w-4" />,
    },
  ],
};

const PAGE_TITLES = {
  Users: "All Users",
  Books: "All Books",
  BorrowedBooks: "Borrowed Books",
  AccountRequests: "Account Requests",
  Categories: "All Categories",
} as const;

const PAGE_COLUMNS = {
  Users: usersColumns,
  Books: booksColumns,
  BorrowedBooks: borrowedBooksColumns,
  AccountRequests: accountRequestsColumns,
  Categories: categoriesColumns,
} as const;

const TableWrapper = <
  T extends Book | TableUser | BorrowRecord | AccountRequest,
>({
  data,
  type,
  meta,
  order,
  setOrder,
  status,
  setStatus,
  setPage,
}: TableWrapperProps<T>) => {
  const table = useReactTable({
    data: data,
    columns: PAGE_COLUMNS[type] as ColumnDef<T, any>[],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <div className="w-full space-y-6 rounded-xl bg-linear-to-br from-gray-50 to-white px-6 pt-6 pb-4 shadow-lg">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">{PAGE_TITLES[type]}</h1>

        <div className="flex gap-2">
          {setStatus && STATUS_FILTER_CONFIGS[type] && (
            <SortFilter
              icon={<ListFilter className="h-4 w-4" />}
              currentSort={status || ""}
              onSortChange={setStatus}
              options={STATUS_FILTER_CONFIGS[type]}
            />
          )}
          {setOrder && (
            <SortFilter
              icon={<ArrowUpDown className="h-4 w-4" />}
              currentSort={order || "desc"}
              onSortChange={setOrder}
            />
          )}

          {type === "Books" && (
            <Link to={"/admin/books/create"}>
              <Button className="form-btn">
                <PlusCircle /> Create new Book{" "}
              </Button>
            </Link>
          )}

          {type === "Categories" && (
            <CategoryForm type="CREATE">
              <Button className="form-btn">
                <PlusCircle /> Create new{" "}
              </Button>
            </CategoryForm>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="hide-scrollbar overflow-auto md:max-h-96 lg:max-h-105 xl:max-h-112">
          <DataTable
            type={type}
            table={table}
            columns={table.getAllColumns()}
          />
        </div>
      </div>

      {/* Pagination Footer */}
      {meta && setPage && (
        <div className="flex w-full justify-end">
          <div className="w-auto">
            <AppPagination
              totalPage={meta.totalPage}
              currentPage={meta.page}
              setPage={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TableWrapper;
