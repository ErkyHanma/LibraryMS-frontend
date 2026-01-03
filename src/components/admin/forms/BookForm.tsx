import { useForm } from "react-hook-form";
import { FormField } from "../../auth/FormField";
import { bookSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import type { Book } from "@/types";
import { cn } from "@/lib/utils";

interface BookFormProps {
  type?: "CREATE" | "EDIT";
  book?: Book;
}

const baseSchema = bookSchema.extend({
  coverFile: z.instanceof(FileList).optional(),
});

const createSchema = bookSchema;
const editSchema = baseSchema.refine((data) => data.coverFile, {
  message: "Please upload a cover image",
  path: ["coverFile"],
});

const BookForm = ({ type = "CREATE", book }: BookFormProps) => {
  const schema = type === "CREATE" ? createSchema : editSchema;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      categories: book?.categories.toString() || "",
      description: book?.description || "",
      summary: book?.summary || "",
      totalCopies: book?.totalCopies || 0,
    },
  });

  // Get the filename
  const coverFile = watch("coverFile");
  const fileName = coverFile?.[0]?.name;

  function handleOnSubmit(data: z.infer<typeof schema>) {
    const file = data.coverFile?.[0];
    console.log(data, file);
  }

  return (
    <form
      className="flex w-full flex-col space-y-4 md:max-w-lg"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <FormField
        id="title"
        label="Book Title"
        register={register}
        error={errors.title}
        placeholder="The Great Gatsby"
      />
      <FormField
        id="author"
        label="Author"
        register={register}
        error={errors.author}
        placeholder="F. Scott Fitzgerald"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="category">Categories</Label>
          <span className="text-xs text-gray-500 italic">
            (separate with commas)
          </span>
        </div>
        <Input
          className="rounded-sm border border-gray-300 bg-white text-sm transition-all focus-within:ring-0 focus-within:outline-0 focus:border-transparent focus:ring-0"
          placeholder="e.g., Fiction, Classic Literature"
          id="category"
          {...register("categories")}
        />
        {errors.categories && (
          <p className="text-sm text-red-500">{errors.categories.message}</p>
        )}
      </div>
      <FormField
        id="description"
        label="Description"
        register={register}
        error={errors.description}
        placeholder="Book description"
      />

      {/* Custom File Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="coverFile">Book Cover</Label>
        <div className="relative">
          <input
            type="file"
            id="coverFile"
            {...register("coverFile")}
            className="hidden text-sm font-semibold"
            accept="image/*"
          />
          <label
            htmlFor="coverFile"
            className="hover:border-primary flex cursor-pointer items-center justify-center gap-3 rounded-sm border border-gray-300 bg-white px-4 py-3 transition-colors"
          >
            <div
              className={cn("flex gap-2 rounded-md px-4 py-1", {
                "bg-gray-200": fileName || book?.coverUrl,
              })}
            >
              <svg
                className={cn("h-5 w-5 text-gray-500", {
                  "text-primary": fileName || book?.coverUrl,
                })}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span
                className={cn("text-sm text-gray-600", {
                  "text-primary font-medium": fileName || book?.coverUrl,
                })}
              >
                {fileName
                  ? fileName
                  : book?.coverUrl
                    ? book.coverUrl
                    : "Choose cover image or drag and drop"}
              </span>
            </div>
          </label>
        </div>
        {errors.coverFile && (
          <p className="text-sm text-red-500">{errors.coverFile.message}</p>
        )}
      </div>

      <FormField
        id="totalCopies"
        label="Total Number of Copies"
        register={register}
        error={errors.totalCopies}
        placeholder="e.g., 50"
        type="number"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="summary">Book Summary</Label>
        <Textarea
          className="max-h-60 min-h-32 resize-none rounded-sm border border-gray-300 bg-white text-sm transition-all focus-within:ring-0 focus-within:outline-0 focus:border-transparent focus:ring-0"
          placeholder="Write a compelling summary that captures the essence of your book..."
          id="summary"
          rows={4}
          {...register("summary")}
        />
        {errors.summary && (
          <p className="text-sm text-red-500">{errors.summary.message}</p>
        )}
      </div>

      <Button>{type === "CREATE" ? "Create" : "Save"}</Button>
    </form>
  );
};

export default BookForm;
