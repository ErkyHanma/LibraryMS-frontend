import { Menu, X } from "lucide-react";
import Logo from "../shared/Logo";
import { useEffect } from "react";

type SidebarMobileProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const SidebarMobile = ({ isOpen, onToggle }: SidebarMobileProps) => {
  // Close sidebar if window size is >= 768px (md breakpoint)
  useEffect(() => {
    const handleResize = () => {
      const BREAKPOINT = 768;

      if (window.innerWidth >= BREAKPOINT && isOpen) {
        onToggle();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 z-50 block w-full px-6 py-4 shadow-sm md:hidden ${
        !isOpen && "glassmorphism"
      }`}
    >
      <div
        className={`flex w-full items-center ${
          isOpen ? "justify-end" : "justify-between"
        }`}
      >
        <div className={`${isOpen && "invisible"}`}>
          <Logo route="/admin" />
        </div>
        <button
          onClick={onToggle}
          className="cursor-pointer duration-100 hover:scale-105"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="mr-3 h-7 w-7 text-white" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarMobile;
