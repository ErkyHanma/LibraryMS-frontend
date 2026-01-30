interface TableSkeletonProps {
  rows?: number;
  showPagination?: boolean;
}

const TableSkeleton = ({
  rows = 4,
  showPagination = true,
}: TableSkeletonProps) => {
  return (
    <div className="w-full space-y-6 rounded-xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-lg">
      {/* Header */}
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-auto">
          {/* Header Row - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50 p-4 md:grid-cols-[2fr_2fr_2fr_1fr]">
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            <div className="hidden h-5 w-28 animate-pulse rounded bg-gray-200 md:block" />
            <div className="hidden h-5 w-32 animate-pulse rounded bg-gray-200 md:block" />
          </div>

          {/* Data Rows - 2 columns on mobile, 4 on desktop */}
          {[...Array(rows)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 border-b border-gray-100 p-4 last:border-b-0 md:grid-cols-[2fr_2fr_2fr_1fr]"
            >
              {/* Column 1: Book Title with Cover */}
              <div className="flex items-center gap-3">
                <div className="h-14 w-10 flex-shrink-0 animate-pulse rounded bg-gray-200 md:h-16 md:w-12" />
                <div className="h-5 w-full max-w-xs animate-pulse rounded bg-gray-200" />
              </div>

              {/* Column 2: Author */}
              <div className="flex items-center">
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Column 3: Categories (hidden on mobile) */}
              <div className="hidden items-center md:flex">
                <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Column 4: Available Copies (hidden on mobile) */}
              <div className="hidden items-center justify-center md:flex">
                <div className="h-5 w-8 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex w-full justify-end">
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-9 w-9 animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSkeleton;
