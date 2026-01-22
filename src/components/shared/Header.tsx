import { HEADER_NAV_LINKS } from "@/constants";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import UserAvatar from "./UserAvatar";

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
              name={user?.name + " " + (user?.lastName ?? "")}
              profileImage={user?.profileImageUrl ?? ""}
            />
            <p className="font-medium">
              {user?.name + " " + (user?.lastName ?? "")}
            </p>
          </Link>

          <button
            onClick={logout}
            className="ml-4 cursor-pointer rounded-md p-1 hover:bg-red-100"
          >
            <img
              className="h-8 transition-all duration-75 hover:scale-105"
              src="/public/icons/Frame.svg"
              alt="Leave icon"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
