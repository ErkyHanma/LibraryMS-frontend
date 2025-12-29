import {
  LogOut,
  LucideLayoutDashboard,
  Users,
  Book,
  FileText,
  UserPlus,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { student2 } from "@/constants";
import type { SidebarNavLink } from "@/types";
import Logo from "../shared/Logo";
import { useState } from "react";
import SidebarMobile from "./SidebarMobile";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { pathname } = useLocation();
  const ADMIN_SIDEBAR_NAVLINKS: SidebarNavLink[] = [
    {
      image: <LucideLayoutDashboard className="h-5 w-5" />,
      route: "/admin",
      label: "Dashboard",
    },
    {
      image: <Users className="h-5 w-5" />,
      route: "/admin/users",
      label: "All Users",
    },
    {
      image: <Book className="h-5 w-5" />,
      route: "/admin/books",
      label: "All Books",
    },
    {
      image: <FileText className="h-5 w-5" />,
      route: "/admin/book-requests",
      label: "Borrow Requests",
    },
    {
      image: <UserPlus className="h-5 w-5" />,
      route: "/admin/account-requests",
      label: "Account Requests",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <SidebarMobile
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-30 bg-black/80 lg:hidden"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-80 transform border-r-2 bg-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full w-full flex-col justify-between px-6 pt-4 pb-5">
          <div className="flex-1">
            <div className="flex w-full items-center justify-between border-b-2 border-gray-100 pb-4">
              <div className={`overflow-hidden transition-all`}>
                <Logo route={"/admin"} />
              </div>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              {ADMIN_SIDEBAR_NAVLINKS.map((link) => {
                const isActive = pathname === link.route;
                return (
                  <Link
                    to={link.route}
                    key={link.route}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition-all duration-200 md:justify-normal md:px-4 ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <div className={isActive ? "text-white" : "text-gray-500"}>
                      {link.image}
                    </div>
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Logout */}
          <div className="flex flex-col gap-3 border-t-2 border-gray-100 pt-4">
            <div className="flex w-full items-center gap-3 rounded-lg bg-gray-50 p-1 px-2 transition-colors hover:bg-gray-100">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  src={student2.profileImage}
                  alt="User profile"
                />
              </div>

              <div className={`overflow-hidden transition-all`}>
                <p className="truncate text-sm font-semibold text-gray-900">
                  {student2.name + " " + student2.lastName}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {student2.email}
                </p>
              </div>
            </div>

            <button
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-sm active:scale-95 md:px-4`}
            >
              <span className={` `}>Logout</span>
              <LogOut className="h-auto w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
