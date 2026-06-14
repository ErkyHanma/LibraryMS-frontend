import DemoBanner from "@/components/shared/DemoBanner";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const MainLayout = () => {
  const { isAuthenticated, isLoading, isDemo } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gray-50 pt-16">
        {isDemo && <DemoBanner />}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
