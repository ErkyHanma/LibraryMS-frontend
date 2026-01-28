import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  currentPage: number;
  totalPage: number;
  setPage: (value: number) => void;
}

const AppPagination = ({
  currentPage,
  totalPage,
  setPage,
}: AppPaginationProps) => {
  const hasNextPage = currentPage < totalPage;
  const hasPreviousPage = currentPage > 1;

  // Don't show pagination if there's only 1 page or no pages
  if (totalPage <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => hasPreviousPage && setPage(currentPage - 1)}
            className={
              !hasPreviousPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => setPage(1)}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Page 2 (only if exists) */}
        {totalPage >= 2 && (
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 2}
              onClick={() => setPage(2)}
              className="cursor-pointer"
            >
              2
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Page 3 or Last Page (only if exists) */}
        {totalPage >= 3 && (
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 3}
              onClick={() => setPage(3)}
              className="cursor-pointer"
            >
              3
            </PaginationLink>
          </PaginationItem>
        )}

        {totalPage > 3 && (
          <PaginationItem>
            <span className="px-4">...</span>
          </PaginationItem>
        )}

        {/* Last page (if more than 3 pages) */}
        {totalPage > 3 && (
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === totalPage}
              onClick={() => setPage(totalPage)}
              className="cursor-pointer"
            >
              {totalPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => hasNextPage && setPage(currentPage + 1)}
            className={
              !hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
