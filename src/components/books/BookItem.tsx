import type { Book } from "@/types";

const BookItem = ({ book }: { book: Book }) => {
  const { id, title, image, categories } = book;
  return (
    <a
      href={`/book/${id}`}
      className="w-full max-w-55 transition duration-200 lg:max-w-45"
      key={title}
    >
      <img className="h-auto w-full" src={image} alt={`${title} image`} />
      <div className="mt-2">
        <p className="book-title">{title}</p>
        <p className="text-gray-400">{categories[0]}</p>
      </div>
    </a>
  );
};

export default BookItem;
