import { NAV_LINKS } from "@/constants";
import Logo from "./Logo";
import { Link, useLocation } from "react-router";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0  w-full bg-white">
      <div className="flex items-center justify-between px-6 shadow-md md:px-12">
        <Logo />
        <div className="flex items-center gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              className={`text-gray-400 hover:text-gray-500 ${pathname === href && "text-primary hover:text-primary/90 font-medium"}`}
              to={href}
              key={label}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center">
            <img
              className="h-auto w-12 cursor-pointer"
              src="/public/images/default-profileImage.png"
              alt=""
            />
            <p className="font-medium">Erky</p>
          </div>

          <button className="ml-4 cursor-pointer rounded-md p-1 hover:bg-red-100">
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
