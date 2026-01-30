import {
  type ColumnDef,
  flexRender,
  type Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  AccountRequest,
  Book,
  TableBorrowRecord,
  TableUser,
} from "@/types";
import { FileX } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<
  TData extends Book | TableBorrowRecord | TableUser | AccountRequest,
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
  type: "Books" | "Users" | "BorrowedBooks" | "AccountRequests";
}

export function DataTable<
  TData extends Book | TableBorrowRecord | TableUser | AccountRequest,
  TValue,
>({ columns, table, type }: DataTableProps<TData, TValue>) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => {
                if (header.column.id === "id") return null;

                return (
                  <TableHead
                    key={header.id}
                    className="mx-4 px-6 py-3.5 text-left text-sm font-semibold tracking-tight text-gray-700"
                  >
                    <span
                      className={cn("", {
                        "flex justify-center": [
                          "Action",
                          "View",
                          "availableCopies",
                          "status",
                          "booksBorrowed",
                          "role",
                        ].includes(header.column.id),
                      })}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50/50 ${row.getIsSelected() ? "bg-blue-50/50" : ""} ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"} `}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "id") return null;

                  return (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-3 align-middle text-sm text-gray-900"
                    >
                      <div
                        className={cn("max-w-60 truncate", {
                          "flex justify-center": [
                            "Action",
                            "View",
                            "availableCopies",
                            "status",
                            "borrowedBooksCount",
                            "role",
                          ].includes(cell.column.id),
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40 text-center">
                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                  <FileX className="h-10 w-10 text-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      No results found
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {type === "Books"
                        ? "Try creating your first book"
                        : "No users match your criteria"}
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
