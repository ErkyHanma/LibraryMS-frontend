import BookList from "@/components/books/BookList";
import BookOverview from "@/components/books/BookOverview";
import { mockBook, mockBooks } from "@/constants";

const Home = () => {
  return (
    <main className="w-full p-8 pt-14">
      <div className="mx-auto flex max-w-6xl flex-col space-y-10">
        <div className="mb-20 w-full flex-3">
          <BookOverview book={mockBook} />
        </div>
        <BookList title="Popular Books" books={mockBooks} />
        <BookList title="Educational Books" books={mockBooks} />
        <BookList title="Suspense Books" books={mockBooks} />
      </div>
    </main>
  );
};

export default Home;
