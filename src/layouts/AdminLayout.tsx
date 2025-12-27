import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
