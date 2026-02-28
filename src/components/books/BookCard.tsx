import { GetYear } from "@/lib/utils";
import type { Book } from "@/types";
import { BookOpen, Calendar } from "lucide-react";

const BookCard = ({ book }: { book: Book }) => {
  const { bookId, title, author, coverUrl, categories, publishDate, pages } =
    book;

  return (
    <a
      href={`/book/${bookId}`}
      className="group block w-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300"
      key={bookId}
    >
      {/* Book Image */}
      <div className="flex items-center justify-center p-4 transition-transform duration-300">
        <img
          className="h-52 w-38 rounded-lg object-cover shadow-lg"
          src={coverUrl}
          alt={`${title} cover`}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col space-y-2 p-4">
        {/* Category Badge */}
        <span className="bg-primary/10 text-primary inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {categories[0].name}
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
            <Calendar className="h-3.5 w-3.5" />
            <span>{GetYear(publishDate)}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{pages} pages</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BookCard;
