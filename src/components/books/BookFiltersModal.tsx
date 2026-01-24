import Modal from "../shared/Modal";
import { Checkbox } from "../ui/checkbox";

interface BookFiltersModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  resetAllFilters: () => void;
  handleApplyFilters: () => void;
  tempIsAvailable: boolean;
  setTempIsAvailable: (value: boolean) => void;
  tempCategories: string[];
  toggleTempCategory: (category: string, checked: boolean | string) => void;
}

const BookFiltersModal = ({
  open,
  setOpen,
  handleApplyFilters,
  resetAllFilters,
  tempIsAvailable,
  setTempIsAvailable,
  tempCategories,
  toggleTempCategory,
}: BookFiltersModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onApply={handleApplyFilters}
    >
      <div className="mt-12 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
          onClick={resetAllFilters}
          className="cursor-pointer text-sm text-gray-400 transition-colors duration-75 hover:text-gray-600"
        >
          RESET
        </button>
      </div>

      {/* Availability Filters */}
      <div className="mb-6 flex flex-col space-y-3">
        <p className="text-lg font-medium">Availability</p>
        <div className="flex items-center gap-3">
          <Checkbox
            checked={tempIsAvailable}
            className="cursor-pointer"
            id="filter-available"
            onCheckedChange={(checked) => {
              setTempIsAvailable(checked === true);
            }}
          />
          <label htmlFor={`filter-available`} className="cursor-pointer">
            Available
          </label>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex flex-col space-y-3">
        <p className="text-lg font-medium">Category</p>
        <div className="flex max-h-64 flex-col space-y-3 overflow-y-auto">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={tempCategories.includes("Education")}
              onCheckedChange={(checked) => {
                toggleTempCategory("Education", checked);
              }}
            />
            <span>Education</span>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={tempCategories.includes("Mathematics")}
              onCheckedChange={(checked) => {
                toggleTempCategory("Mathematics", checked);
              }}
            />
            <span>Mathematics</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookFiltersModal;
