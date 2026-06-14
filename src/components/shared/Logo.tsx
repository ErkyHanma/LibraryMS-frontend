import { Link } from "react-router";

type LogoProps = {
  route: string;
  color?: string;
};

const Logo = ({ route, color = "text-foreground" }: LogoProps) => {
  return (
    <Link to={route} className="flex items-center gap-1">
      <img className="h-auto w-8" src="/images/Logo.png" alt="Logo" />
      <p className={`text-2xl font-semibold ${color}`}>LibraryMs</p>
    </Link>
  );
};

export default Logo;
