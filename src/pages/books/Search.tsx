import BookCard from "@/components/books/BookCard";
import BookFilters from "@/components/books/BookFilters";
import BookFiltersModal from "@/components/books/BookFiltersModal";
import BookPagination from "@/components/books/BookPagination";
import { ErrorState } from "@/components/shared/ErrorState";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import type { ApiError } from "@/services/apiError";
import { useGetBooks } from "@/services/books/queries";
import type { Book } from "@/types";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Temporal values for modal
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempIsAvailable, setTempIsAvailable] = useState(false);

  // URL params
  const searchTerm = searchParams.get("search") || "";
  const activeCategories = searchParams.getAll("category");
  const activeIsAvailable = searchParams.get("isAvailable") === "true";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Debounce search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Build filters object for API call
  const filters = useMemo(
    () => ({
      category: activeCategories || undefined,
      isAvailable: activeIsAvailable || undefined,
      page: currentPage || "1",
      limit: 12, // Default 12
    }),
    [activeCategories, activeIsAvailable, currentPage],
  );

  const handleSetPage = (value: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", value.toString());
      return params;
    });
  };

  // Fetch books
  const {
    data: books,
    isLoading,
    error,
    isFetching,
  } = useGetBooks(true, debouncedSearchTerm, filters);

  // Calculation for active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategories.length > 0) count += activeCategories.length;
    if (activeIsAvailable) count += 1;
    return count;
  }, [activeCategories, activeIsAvailable]);

  const updateParams = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    setSearchParams(params);
  };

  // Toggle category filter (immediate update for desktop)
  const toggleCategoryFilter = (
    category: string,
    checked: boolean | string,
  ) => {
    const updatedCategories = checked
      ? [...activeCategories, category]
      : activeCategories.filter((c) => c !== category);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", "1");
      params.delete("category");
      updatedCategories.forEach((c) => params.append("category", c));
      return params;
    });
  };

  // Toggle category in temporary state (for modal)
  const toggleTempCategory = (category: string, checked: boolean | string) => {
    setTempCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category),
    );
  };

  // Open modal and initialize temporary state
  const openFiltersModal = () => {
    setTempCategories(activeCategories);
    setTempIsAvailable(activeIsAvailable);
    setIsModalOpen(true);
  };

  // Apply temporary filters to URL
  const applyModalFilters = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.delete("category");
      params.set("page", "1");
      tempCategories.forEach((c) => params.append("category", c));

      // Update availability
      if (tempIsAvailable) {
        params.set("isAvailable", "true");
      } else {
        params.delete("isAvailable");
      }

      return params;
    });
    setIsModalOpen(false);
  };

  const resetAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("category");
    params.delete("isAvailable");
    setSearchParams(params);
  };

  const clearAllSearchAndFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("category");
    params.delete("isAvailable");
    params.delete("search");
    setSearchParams(params);
  };

  if (error) {
    return <ErrorState message={(error as ApiError).message} />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  const hasResults = books.data.length > 0;

  return (
    <main className="w-full p-6 pt-10">
      <div className="mx-auto max-w-7xl">
        <section className="flex w-full max-w-2xl flex-col space-y-2">
          <h1 className="text-3xl font-bold">Browse Catalog</h1>
          <p className="text-gray-400">
            Discover a wide range of books by exploring and searching our
            library catalog.
          </p>

          <div className="flex gap-2">
            <Input
              value={searchTerm}
              className="bg-white"
              placeholder="Search by title or author"
              onChange={(e) => updateParams("search", e.target.value)}
            />
          </div>
        </section>

        <div className="mt-8 flex w-full flex-col gap-16 md:flex-row">
          {/* Desktop filters sidebar */}
          <BookFilters
            updateParams={updateParams}
            toggleCategoryFilter={toggleCategoryFilter}
            resetAllFilters={resetAllFilters}
            activeCategories={activeCategories}
            activeIsAvailable={activeIsAvailable}
          />

          {/* Results section */}
          <section className="flex flex-1 flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <p>
                <span className="font-semibold">{books.data.length}</span>{" "}
                results found
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={openFiltersModal}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-all hover:border-gray-400 hover:shadow active:scale-95 lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  <span>Filters</span>
                  <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                    {activeFilterCount}
                  </span>
                </button>

                <button
                  onClick={clearAllSearchAndFilters}
                  className="cursor-pointer rounded-full p-2 text-sm transition duration-100 hover:bg-gray-200"
                >
                  CLEAR
                </button>
              </div>
            </div>

            {/* Results content */}
            {isFetching ? (
              <div className="flex h-80 w-full items-center justify-center">
                <Spinner className="size-8" />
              </div>
            ) : hasResults ? (
              <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3">
                {books.data.map((book: Book) => (
                  <BookCard book={book} key={book.bookId} />
                ))}
              </div>
            ) : (
              // Empty state
              <div className="flex flex-col items-center justify-center py-16">
                <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-12 w-12 text-gray-600"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607"
                    />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  No results found
                </h2>
                {searchTerm && (
                  <p className="max-w-lg text-center text-gray-500">
                    We couldn't find any books matching
                    <span className="font-semibold text-black">
                      {" "}
                      "{searchTerm}"
                    </span>
                    . Try using different keywords or check for typos.
                  </p>
                )}
              </div>
            )}

            <div className="my-8">
              <BookPagination
                currentPage={currentPage}
                totalPage={books.meta.totalPage}
                setPage={handleSetPage}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Mobile filters modal */}
      <BookFiltersModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        handleApplyFilters={applyModalFilters}
        resetAllFilters={resetAllFilters}
        setTempIsAvailable={setTempIsAvailable}
        toggleTempCategory={toggleTempCategory}
        tempCategories={tempCategories}
        tempIsAvailable={tempIsAvailable}
      />
    </main>
  );
};

export default Search;
