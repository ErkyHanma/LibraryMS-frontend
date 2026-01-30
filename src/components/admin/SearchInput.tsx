import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  searchValue: string;
  handleSearch: (value: string) => void;
}

const SearchInput = ({
  placeholder,
  searchValue,
  handleSearch,
}: SearchInputProps) => {
  return (
    <div className="flex w-full items-center rounded-sm border border-gray-400 px-2 py-2 md:max-w-80">
      <Search className="size-5 text-gray-500" />
      <input
        value={searchValue}
        placeholder={placeholder ?? "Search..."}
        className="w-full rounded-none border-none px-2 outline-0"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
