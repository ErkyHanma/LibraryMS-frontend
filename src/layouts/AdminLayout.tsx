import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />

      <main className="w-full bg-gray-50 pt-16 md:pt-4 md:pl-80">
        <div className="px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
