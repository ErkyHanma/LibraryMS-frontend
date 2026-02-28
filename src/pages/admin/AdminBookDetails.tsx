import { Button } from "@/components/ui/button";

import { BookOpen, Calendar, Edit } from "lucide-react";
import { Link, useParams } from "react-router";
import BackButton from "../../components/admin/BackButton";
import { formatDate } from "@/lib/utils";
import type { Category } from "@/types";
import { useGetBookById } from "@/services/admin/queries";
import { Spinner } from "@/components/ui/spinner";

const AdminBookDetails = () => {
  const { id } = useParams();

  const { data: book, isFetching } = useGetBookById(id ?? "0");

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center p-8">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-8">
        <p>Book not found</p>
        <BackButton to="/admin/books" label="Go to Books" variant="ghost" />
      </div>
    );
  }

  const {
    coverUrl,
    publishDate,
    createdAt,
    pages,
    description,
    availableCopies,
    totalCopies,
    categories,
    bookId,
    title,
    author,
    summary,
  } = book;

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
                  className="h-auto min-h-68 w-full max-w-70 object-cover lg:max-w-full"
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
                  <span>Created At: {formatDate(createdAt)}</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                  {title}
                </h1>
                <p className="text-muted-foreground mt-3 text-base">
                  by{" "}
                  <span className="text-primary font-semibold">{author}</span>
                </p>

                {/* Published Year & Pages */}
                <div className="-mt-2 mb-4 flex items-center gap-2 border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(publishDate)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{pages} pages</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map(({ name, categoryId }: Category) => (
                    <span
                      className="bg-primary/10 text-primary ring-primary/20 inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset"
                      key={categoryId}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <Link to={`/admin/books/edit/${bookId}`}>
                <Button className="w-full md:max-w-100" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Book Details
                </Button>
              </Link>
            </div>
          </section>

          <div className="mt-12 flex flex-col space-y-8 md:flex-row md:space-x-8">
            <div className="flex w-full flex-col">
              {/* Description Section */}
              {description && (
                <section className="bg-card space-y-4 rounded-lg border p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold">Description</h2>
                  <p className="text-base leading-relaxed text-[#64748B]">
                    {description}
                  </p>
                </section>
              )}

              {/* Summary Section */}
              <section className="bg-card mt-8 space-y-4 rounded-lg border p-6 shadow-sm">
                <h2 className="text-2xl font-semibold">Summary</h2>
                <div className="space-y-4 text-base text-[#64748B]">
                  {summary.split("\n").map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </section>
            </div>

            {/* Inventory Section */}
            <section className="w-full md:max-w-[30%]">
              {/* Inventory Card */}
              <div className="bg-card flex flex-col space-y-4 rounded-lg border p-8 shadow-sm">
                <div className="mb-8 flex w-full items-center justify-between">
                  <h3 className="text-2xl font-bold md:text-xl">Inventory</h3>
                  <span
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                      availableCopies > 0
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {availableCopies > 0 ? "IN STOCK" : "OUT OF STOCK"}
                  </span>
                </div>

                <div className="space-y-8">
                  {/* Availability Progress */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Availability
                      </span>
                      <span className="text-lg font-bold">
                        {availableCopies} of {totalCopies} copies
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{
                          width: `${(availableCopies / totalCopies) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Available and Total */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-100 p-4">
                      <p className="mb-1 text-xs font-medium tracking-wider text-slate-400 uppercase">
                        Available
                      </p>
                      <p className="text-2xl font-bold">
                        {availableCopies.toString().padStart(2, "0")}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-4">
                      <p className="mb-1 text-xs font-medium tracking-wider text-slate-400 uppercase">
                        Total
                      </p>
                      <p className="text-2xl font-bold">
                        {totalCopies.toString().padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminBookDetails;
