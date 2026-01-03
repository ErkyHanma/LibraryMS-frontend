const BookPagination = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <button type="button" aria-label="Previous" className="mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="16"
          fill="none"
          viewBox="0 0 12 18"
        >
          <path
            stroke="#111820"
            strokeLinecap="round"
            strokeOpacity=".7"
            strokeWidth="2"
            d="M11 1 2 9.242 11 17"
          />
        </svg>
      </button>

      <div className="flex gap-2 text-sm text-gray-500 md:text-base">
        <button
          type="button"
          className="flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white transition-all hover:bg-gray-100/70 active:scale-95 md:h-12 md:w-12"
        >
          1
        </button>
        <button
          type="button"
          className="bg-primary flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-md text-white transition-all active:scale-95 md:h-12 md:w-12"
        >
          2
        </button>
        <button
          type="button"
          className="flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white transition-all hover:bg-gray-100/70 active:scale-95 md:h-12 md:w-12"
        >
          3
        </button>
        <button
          type="button"
          className="flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white transition-all hover:bg-gray-100/70 active:scale-95 md:h-12 md:w-12"
        >
          4
        </button>
        <button
          type="button"
          className="flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white transition-all hover:bg-gray-100/70 active:scale-95 md:h-12 md:w-12"
        >
          5
        </button>
        <button
          type="button"
          className="flex aspect-square h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white transition-all hover:bg-gray-100/70 active:scale-95 md:h-12 md:w-12"
        >
          6
        </button>
      </div>

      <button type="button" aria-label="Next" className="ml-4">
        <svg
          width="9"
          height="16"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L10 9.24242L1 17"
            stroke="#111820"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default BookPagination;
