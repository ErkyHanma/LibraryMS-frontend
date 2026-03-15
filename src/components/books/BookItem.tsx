import type { Book } from "@/types";

const BookItem = ({ book }: { book: Book }) => {
  const { bookId, title, coverUrl, categories } = book;
  return (
    <a
      href={`/book/${bookId}`}
      className="w-full max-w-45 transition duration-200 hover:scale-103"
      key={title}
    >
      <img
        className="max-h-70 min-h-58 w-full rounded-lg object-cover"
        src={coverUrl}
        alt={`${title} cover`}
      />
      <div className="mt-2">
        <p className="book-title">{title}</p>
        <p className="text-gray-400">
          {categories.map((categorie, i) => {
            if (categories.length - 1 === i)
              return <span key={categorie.categoryId}>{categorie.name} </span>;

            return <span key={categorie.categoryId}>{categorie.name}, </span>;
          })}
        </p>
      </div>
    </a>
  );
};

export default BookItem;
