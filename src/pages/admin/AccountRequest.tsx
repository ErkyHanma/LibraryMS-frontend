// import SearchInput from "@/components/admin/SearchInput";
import SearchInput from "@/components/admin/SearchInput";
import TableSkeleton from "@/components/admin/TableSkeleton";
import TableWrapper from "@/components/admin/TableWrapper";
import useDebounce from "@/hooks/useDebounce";
import { useGetAccountRequest } from "@/services/admin/queries";
import { useMemo, useState } from "react";

const AccountRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");
  const [status, setStatus] = useState<string | undefined>(undefined);

  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const filters = useMemo(
    () => ({
      page: page,
      limit: 10, // Default 10
      order: order,
      status: status,
    }),
    [page, order, status],
  );

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatus((prev) =>
      prev?.toLowerCase() === status.toLowerCase() ? "" : status,
    );
    setPage(1);
  };

  const { data, isFetching } = useGetAccountRequest(
    debounceSearchTerm,
    filters,
  );

  return (
    <div className="min-h-screen w-full pt-20 pb-4 md:pt-4">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Account Requests
          </h1>
          <p className="text-sm text-gray-600">
            Check all your account requests
          </p>
        </div>

        <SearchInput
          placeholder="Search users by name"
          searchValue={searchTerm}
          handleSearch={setSearchTerm}
        />
      </div>

      {isFetching ? (
        <TableSkeleton />
      ) : (
        <TableWrapper
          data={data.data}
          meta={data.meta}
          type="AccountRequests"
          setOrder={handleOrderChange}
          order={order}
          status={status}
          setStatus={handleStatusChange}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default AccountRequest;
