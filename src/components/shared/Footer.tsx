import Logo from "@/components/shared/Logo";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === "/profile") return null;

  return (
    <footer className="bg-primary w-full px-6 pt-16 text-white/70 md:px-16 lg:px-24 xl:px-32">
      <div className="flex w-full flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row">
        <div className="md:max-w-96">
          <Logo route="/" color="text-white" />
          <p className="mt-6 text-sm leading-6">
            LibraryMs is a modern university library management system designed
            to empower learning. Discover, organize, and access academic
            resources effortlessly with our comprehensive platform.
          </p>
        </div>
        <div className="flex flex-1 items-start gap-20 md:justify-end">
          <div>
            <h2 className="mb-5 font-semibold text-white">Navigation</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/home" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="transition-colors hover:text-white"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="transition-colors hover:text-white"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-5 font-semibold text-white">Get in touch</h2>
            <div className="space-y-3 text-sm">
              <p>+1-809-302-0207</p>
              <p>yenzel.bt@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-8 text-center text-xs md:text-sm">
        Copyright {new Date().getFullYear()} © LibraryMs. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
