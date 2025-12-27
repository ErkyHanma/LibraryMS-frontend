import { Link } from "react-router";

type LogoProps = {
  route: string;
};

const Logo = ({ route }: LogoProps) => {
  return (
    <Link to={route} className="flex items-center gap-1">
      <img className="h-auto w-8" src="/public/images/Logo.png" alt="Logo" />
      <p className="text-2xl font-semibold">LibraryMs</p>
    </Link>
  );
};

export default Logo;
