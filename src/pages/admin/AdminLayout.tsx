import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="bg-primary/5 flex min-h-screen w-full">
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
