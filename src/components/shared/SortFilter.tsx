import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SortFilterProps {
  currentSort: string;
  onSortChange: (value: string) => void;
  options?: SortOption[];
  icon?: React.ReactNode;
}

const SortFilter = ({
  currentSort,
  onSortChange,
  options = [
    { value: "desc", label: "Newest First", icon: <ChevronDown /> },
    { value: "asc", label: "Oldest First", icon: <ChevronUp /> },
  ],
  icon,
}: SortFilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-50">
          {icon ?? <Filter className="h-4 w-4 text-gray-600" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-38 p-2 mr-1">
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${
                currentSort === option.value
                  ? "text-primary bg-blue-500/15 font-medium"
                  : "text-gray-700"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortFilter;
