import { Book, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

const BookTabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      path: "/admin/books",
      label: "Books",
      icon: Book,
    },
    {
      path: "/admin/books/categories",
      label: "Categories",
      icon: FolderOpen,
    },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-lg p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentPath === tab.path;

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "inline-flex border items-center gap-2 rounded-md px-3 py-1 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BookTabNavigation;
