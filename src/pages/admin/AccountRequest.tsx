import TableWrapper from "@/components/admin/TableWrapper";
import { mockTableAccountRequest } from "@/mocks";

const AccountRequest = () => {
  return (
    <div className="min-h-screen w-full pt-20 pb-4 md:pt-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Borrow Requests
        </h1>
        <p className="text-sm text-gray-600">Check all your account requests</p>
      </div>

      <TableWrapper data={mockTableAccountRequest} type="AccountRequests" />
    </div>
  );
};

export default AccountRequest;
