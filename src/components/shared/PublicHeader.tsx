import { Link } from "react-router";
import { Button } from "../ui/button";
import Logo from "./Logo";

const PublicHeader = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-6 py-4 shadow-md md:px-12">
        <Logo route="/" />
        <nav className="flex items-center space-x-2">
          <Link to="/auth/login" className="mr-4">
            <Button className="text-md py-5" variant="outline">
              Login
            </Button>
          </Link>

          <div className="h-6 w-px bg-gray-300"></div>

          <Link to="/auth/signup" className="ml-1">
            <Button className="text-md px-6 py-5">Sign Up</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
