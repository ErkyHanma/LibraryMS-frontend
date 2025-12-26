import Header from "@/components/shared/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="w-full bg-gray-50 pt-16">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
