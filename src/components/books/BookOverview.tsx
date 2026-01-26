import { Button } from "../ui/button";
import type { Book } from "@/types";

type Props = {
  book: Book;
};

const BookOverview = ({ book }: Props) => {
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
          className="h-auto w-full max-w-xs object-cover"
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
              {categories.map((c, i) => (
                <span key={c.categoryId}>
                  {c.name}
                  {i < categories.length - 1 && ", "}
                </span>
              ))}
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
          Borrow Book Request
        </Button>
      </div>
    </section>
  );
};

export default BookOverview;
