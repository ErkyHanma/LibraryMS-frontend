import type { Book } from "@/types";

const BookItem = ({ book }: { book: Book }) => {
  const { bookId, title, coverUrl, categories } = book;
  return (
    <a
      href={`/book/${bookId}`}
      className="w-full max-w-55 transition duration-200 lg:max-w-45"
      key={title}
    >
      <img className="h-auto w-full" src={coverUrl} alt={`${title} cover`} />
      <div className="mt-2">
        <p className="book-title">{title}</p>
        <p className="text-gray-400">{categories.split(", ")[0]}</p>
      </div>
    </a>
  );
};

export default BookItem;
