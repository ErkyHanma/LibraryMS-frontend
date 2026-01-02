import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-primary/5">
      <Sidebar />

      <main className="w-full md:pl-80">
        <div className="px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
