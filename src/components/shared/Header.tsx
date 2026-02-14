import { HEADER_NAV_LINKS } from "@/constants";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import UserAvatar from "./UserAvatar";
import { ShieldCheck } from "lucide-react";

const Header = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-6 py-3 shadow-md md:px-12">
        <Logo route="/home" />
        <div className="flex items-center gap-3">
          {HEADER_NAV_LINKS.map(({ label, route }) => (
            <Link
              className={`text-gray-400 hover:text-gray-500 ${pathname === route && "text-primary hover:text-primary/90 font-medium"}`}
              to={route}
              key={label}
            >
              {label}
            </Link>
          ))}
          <Link to={"/profile"} className="flex items-center gap-1">
            <UserAvatar
              fullname={user?.name + " " + (user?.lastName ?? "")}
              profileImageUrl={user?.profileImageUrl ?? ""}
            />
            <p className="hidden font-medium md:flex">
              {user?.name + " " + (user?.lastName ?? "")}
            </p>
          </Link>

          <div className="flex gap-1">
            {user?.role.toUpperCase() === "ADMIN" && (
              <>
                <Link
                  to="/admin"
                  className="group hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-md p-1 px-2 transition-all duration-200 hover:shadow-sm active:scale-[0.98] md:ml-2"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="text-primary size-6 transition-transform duration-200 group-hover:scale-110" />
                  <span className="text-primary hidden text-sm font-semibold md:inline">
                    Admin
                  </span>
                </Link>
              </>
            )}

            <button
              onClick={logout}
              className="cursor-pointer rounded-md p-1 hover:bg-red-100 "
            >
              <img
                className="h-7 transition-all duration-75 hover:scale-105"
                src="/public/icons/Frame.svg"
                alt="Leave icon"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
