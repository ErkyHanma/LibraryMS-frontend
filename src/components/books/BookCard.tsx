import { GetYear } from "@/lib/utils";
import type { Book } from "@/types";

const BookCard = ({ book }: { book: Book }) => {
  const { bookId, title, author, coverUrl, categories, publishDate, pages } = book;

  return (
    <a
      href={`/book/${bookId}`}
      className="group block w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300"
      key={bookId}
    >
      {/* Book Image */}
      <div className="flex items-center justify-center p-8 transition-transform duration-300">
        <img
          className="h-auto w-full max-w-32 rounded-lg shadow-lg lg:max-w-36"
          src={coverUrl}
          alt={`${title} cover`}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-2 p-4">
        {/* Category Badge */}
        <span className="bg-primary/10 text-primary inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {categories.split(", ")[0]}
        </span>

        {/* Title */}
        <h3 className="group-hover:text-primary line-clamp-2 text-base leading-snug font-bold text-gray-900 transition-colors">
          {title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600">
          by <span className="font-medium text-gray-900">{author}</span>
        </p>

        {/* Footer: Year & Pages */}
        <div className="flex items-center gap-2 border-t border-gray-100 pt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{GetYear(publishDate)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>{pages} pages</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BookCard;
