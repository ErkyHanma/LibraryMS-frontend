// import SearchInput from "@/components/admin/SearchInput";
import TableSkeleton from "@/components/admin/TableSkeleton";
import TableWrapper from "@/components/admin/TableWrapper";
import useDebounce from "@/hooks/useDebounce";
import { useGetAccountRequest } from "@/services/admin/queries";
import { useMemo, useState } from "react";

const AccountRequest = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("desc");

  const debounceSearchTerm = useDebounce("", 500);

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

  const { data, isFetching } = useGetAccountRequest(
    debounceSearchTerm,
    filters,
  );

  console.log(data);

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

        {/* <SearchInput
          placeholder="Search user by name or email"
          searchValue={searchTerm}
          handleSearch={setSearchTerm}
        /> */}
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
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default AccountRequest;
