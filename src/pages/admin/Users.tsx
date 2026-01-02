import TableWrapper from "@/components/admin/TableWrapper";
import { mockTableUsers } from "@/mocks";

const Users = () => {
  return (
    <div className="h-screen w-full pt-20 md:pt-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Users</h1>
        <p className="text-sm text-gray-600">
          Welcome back! Here's what's happening with your library today.
        </p>
      </div>

      <TableWrapper data={mockTableUsers} type="Users" />
    </div>
  );
};

export default Users;
