import { Button } from "@/components/ui/button";
import { mockBook, mockBooks } from "@/mocks";
import { dateConverter } from "@/utils";
import { Calendar, Edit } from "lucide-react";
import { Link, useParams } from "react-router";
import BackButton from "./BackButton";

const AdminBookDetails = () => {
  const { id } = useParams();

  const { coverUrl, categories, bookId, title, author, createdAt, summary } =
    mockBooks.find((book) => book.bookId === id) || mockBook;

  return (
    <div className="min-h-screen w-full pt-20 pb-8 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        <BackButton to="/admin/books" label="Go to Books" variant="ghost" />

        <div className="mt-8 md:px-6">
          <section className="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Book Cover */}
            <div className="flex items-start justify-center lg:w-54">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                <img
                  className="h-auto w-full max-w-[280px] object-cover lg:max-w-full"
                  src={coverUrl}
                  alt="Book cover"
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="flex flex-1 flex-col space-y-6">
              <div className="space-y-4">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Added {dateConverter(createdAt)}</span>
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                    {title}
                  </h1>
                  <p className="text-muted-foreground mt-3 text-base">
                    by{" "}
                    <span className="text-primary font-semibold">{author}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span
                      className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset"
                      key={category}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <Link to={`/admin/books/edit/${bookId}`}>
                <Button className="w-full md:max-w-[400px]" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Book Details
                </Button>
              </Link>
            </div>
          </section>

          {/* Summary Section */}
          <section className="mt-12 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary h-8 w-1 rounded-full"></div>
              <h2 className="text-2xl font-semibold">Summary</h2>
            </div>
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default AdminBookDetails;
