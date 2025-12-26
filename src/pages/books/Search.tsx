import BookCard from "@/components/books/BookCard";
import BookFilters from "@/components/books/BookFilters";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { mockBooks } from "@/constants";
import { useState } from "react";

const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="w-full p-6 pt-10">
      <div className="mx-auto max-w-7xl">
        {/*Search input section*/}
        <section className="flex w-full max-w-2xl flex-col space-y-2">
          <h1 className="text-3xl font-bold">Browse Catalog</h1>
          <p className="text-gray-400">
            Discover a wide range of books by exploring and searching our
            library catalog.
          </p>
          <div className="flex gap-2">
            <Input
              className="bg-white"
              placeholder="Search by title or author"
            />
            <Button className="form-btn">Search</Button>
          </div>
        </section>

        <div className="mt-8 flex w-full flex-col gap-16 md:flex-row">
          <BookFilters />

          <section className="flex flex-1 flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <p>
                <span className="font-semibold">342</span> results found
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(true)}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm transition-all hover:border-gray-400 hover:shadow active:scale-95 lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  <span>Filters</span>
                  <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                    2
                  </span>
                </button>
                <p className="cursor-pointer rounded-full p-2 text-sm transition duration-100 hover:bg-gray-200">
                  CLEAR
                </p>
              </div>
            </div>
            {/* Better responsive grid */}
            <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-3">
              {mockBooks.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
              {mockBooks.map((book) => (
                <BookCard book={book} key={book.id} />
              ))}
            </div>

            <div className="my-8 flex w-full items-center justify-center gap-2">
              <button type="button" aria-label="Previous" className="mr-4">
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1L2 9.24242L11 17"
                    stroke="#111820"
                    stroke-opacity="0.7"
                    stroke-width="2"
                    stroke-linecap="round"
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
                    stroke-opacity="0.7"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mb-6 flex items-center justify-between">
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
            onClick={() => {}}
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
              defaultChecked
              className="cursor-pointer"
              id={`filter-available`}
            />
            <label
              htmlFor={`filter-available`}
              className="cursor-pointer text-sm"
            >
              Available
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              className="cursor-pointer"
              id={`filter-borrowed`}
            />
            <label
              htmlFor={`filter-borrowed`}
              className="cursor-pointer text-sm"
            >
              Borrowed
            </label>
          </div>
        </div>

        <div className="my-6 h-px bg-gray-200"></div>

        {/* Genre Filters */}
        <div className="flex flex-col space-y-3">
          <p className="text-lg font-medium">Genre</p>
          <Input className="mb-2 bg-white" placeholder="Search genres..." />

          <div className="flex max-h-64 flex-col space-y-3 overflow-y-auto">
            {[
              "Action",
              "Sci-Fi",
              "Programming",
              "Education",
              "Design",
              "History",
            ].map((genre) => (
              <div key={genre} className="flex items-center gap-3">
                <Checkbox
                  className="cursor-pointer"
                  id={`filter-${genre.toLowerCase()}`}
                />
                <label
                  htmlFor={`filter-${genre.toLowerCase()}`}
                  className="cursor-pointer text-sm"
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Search;
