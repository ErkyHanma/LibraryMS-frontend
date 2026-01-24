import { Button } from "../ui/button";
import type { Book } from "@/types";

const BookOverview = ({ book }: { book: Book }) => {
  const {
    title,
    author,
    coverUrl,
    categories,
    description,
    availableCopies,
    totalCopies,
  } = book;

  return (
    <section className="flex w-full flex-col justify-between gap-6 md:flex-row-reverse">
      <div className="flex w-full flex-1 items-center justify-center">
        <img
          className="h-auto w-full max-w-xs"
          src={coverUrl}
          alt="Book cover"
        />
      </div>
      <div className="flex w-full flex-1 flex-col space-y-1">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">{title}</h1>
        <div className="mb-4 flex flex-col gap-2 md:flex-row">
          <p>
            By <span className="text-primary font-medium">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="text-primary font-semibold">
              {categories.map((categorie, i) => {
                if (categories.length - 1 === i)
                  return (
                    <span key={categorie.categoryId}>{categorie.name} </span>
                  );

                return (
                  <span key={categorie.categoryId}>{categorie.name}, </span>
                );
              })}
            </span>
          </p>
        </div>

        <div className="mb-6 flex gap-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Total books</span>
            <span className="text-primary text-2xl font-bold">
              {totalCopies}
            </span>
          </div>
          <div className="h-auto w-px bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Available</span>
            <span className="text-2xl font-bold text-green-600">
              {availableCopies}
            </span>
          </div>
        </div>

        <p className="mb-6">{description}</p>

        <Button className="form-btn mt-2 md:max-w-62.5">
          Borrow Book Request{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-6"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.97 8.97 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A9 9 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.97 8.97 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A9 9 0 0 0 18 18a8.97 8.97 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        </Button>
      </div>
    </section>
  );
};

export default BookOverview;
