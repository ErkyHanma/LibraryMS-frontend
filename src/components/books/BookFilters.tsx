import { Checkbox } from "../ui/checkbox";

interface FiltersProps {
  updateParams: (key: string, value: string) => void;
  toggleCategoryFilter: (category: string, checked: boolean | string) => void;
  resetAllFilters: () => void;
  categories: string[];
  isAvailable: boolean;
}

const BookFilters = ({
  updateParams,
  toggleCategoryFilter,
  categories,
  resetAllFilters,
  isAvailable,
}: FiltersProps) => {
  return (
    <section className="sticky top-20 hidden max-h-120 w-full max-w-90 rounded-lg bg-white p-5 shadow-md lg:block">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-primary size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
        <button
          onClick={() => resetAllFilters()}
          className="cursor-pointer text-sm text-gray-400 duration-75 hover:text-gray-300"
        >
          RESET
        </button>
      </div>

      {/*Availability Filters*/}
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-medium">Availability</p>
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isAvailable}
            className="cursor-pointer"
            id="filter-available"
            onCheckedChange={(checked) => {
              if (checked === true) {
                updateParams("isAvailable", "true");
              } else {
                updateParams("isAvailable", "");
              }
            }}
          />
          <label htmlFor="filter-available">Available</label>
        </div>
      </div>

      <div className="my-4 ml-4 flex h-px w-[90%] bg-gray-200 px-8"></div>

      {/*Genre Filters*/}
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-medium">Category</p>
        <div className="flex items-center gap-4">
          <Checkbox
            className="cursor-pointer"
            checked={categories.includes("Education")}
            onCheckedChange={(checked) => {
              toggleCategoryFilter("Education", checked);
            }}
          />
          <label className="cursor-pointer">Education</label>
        </div>
        <div className="flex cursor-pointer items-center gap-4">
          <Checkbox
            checked={categories.includes("Mathematics")}
            onCheckedChange={(checked) => {
              toggleCategoryFilter("Mathematics", checked);
            }}
          />
          <label>Mathematics</label>
        </div>
      </div>
    </section>
  );
};

export default BookFilters;
