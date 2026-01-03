import BookOverview from "@/components/books/BookOverview";
import { mockBook, mockBooks } from "@/mocks";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();

  const book = mockBooks.find((book) => book.bookId === id) || mockBook;

  return (
    <main className="w-full p-8 pt-14">
      <div className="mx-auto flex max-w-6xl flex-col space-y-10">
        <div className="mb-20 w-full flex-3">
          <BookOverview book={book} />
        </div>
        <section className="flex w-full flex-col justify-between gap-16 md:flex-row md:gap-24 lg:gap-36">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-2xl font-semibold">Summary</h1>
            <div className="space-y-4 text-base">
              {book.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-2xl font-semibold">Similar Books</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {mockBooks.map(({ bookId, coverUrl, title }) => (
                <a
                  href={`/book/${bookId}`}
                  className="w-full max-w-50 cursor-pointer transition duration-200 hover:opacity-80 sm:max-w-62.5 md:max-w-37.5"
                  key={id}
                >
                  <img
                    className="h-auto w-full"
                    src={coverUrl}
                    alt={`${title} cover`}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookDetails;
