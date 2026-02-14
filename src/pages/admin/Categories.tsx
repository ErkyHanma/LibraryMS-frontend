import BookTabNavigation from "@/components/admin/BookTabNavigation";
import SearchInput from "@/components/admin/SearchInput";
import TableSkeleton from "@/components/admin/TableSkeleton";
import TableWrapper from "@/components/admin/TableWrapper";
import useDebounce from "@/hooks/useDebounce";
import { useGetCategoriesWithPagination } from "@/services/admin/queries";
import { useMemo, useState } from "react";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");

  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const filters = useMemo(
    () => ({
      page: page,
      limit: 10, // Default 10
      order: order,
    }),
    [page, order],
  );

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    setPage(1);
  };

  const { data, isFetching } = useGetCategoriesWithPagination(
    debounceSearchTerm,
    filters,
  );

  return (
    <div className="min-h-screen w-full pt-20 md:pt-4">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-600">Check all categories</p>
        </div>
        <SearchInput
          placeholder="Search categories by name"
          searchValue={searchTerm}
          handleSearch={setSearchTerm}
        />
      </div>

      {/* Tabs for Books and Categories */}
      <div className="mb-2">
        <BookTabNavigation />
      </div>

      {isFetching ? (
        <TableSkeleton />
      ) : (
        <TableWrapper
          data={data.data}
          meta={data.meta}
          type="Categories"
          setOrder={handleOrderChange}
          order={order}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default Categories;
