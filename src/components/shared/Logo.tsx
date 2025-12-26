import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"home"} className="flex items-center gap-1 py-4">
      <img className="h-auto w-8" src="/public/images/Logo.png" alt="Logo" />
      <p className="text-2xl font-semibold">LibraryMs</p>
    </Link>
  );
};

export default Logo;
