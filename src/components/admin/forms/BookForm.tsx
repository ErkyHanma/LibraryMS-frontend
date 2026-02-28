import { useForm } from "react-hook-form";
import { FormField } from "../../shared/FormField";
import { createBookSchema, editBookSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import type { Book, CreateBookParams, Category, EditBookParams } from "@/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Check, Image } from "lucide-react";
import { useGetCategories } from "@/services/admin/queries";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useCreateBook, useEditBook } from "@/services/admin/mutations";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface BookFormProps {
  type?: "CREATE" | "EDIT";
  book?: Book;
}

const BookForm = ({ type = "CREATE", book }: BookFormProps) => {
  const navigate = useNavigate();
  const schema = type === "CREATE" ? createBookSchema : editBookSchema;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categoryList, setCategoryList] = useState<number[]>([]);

  useEffect(() => {
    if (book?.categories) {
      const categoryIds = book.categories.map(
        (cat: Category) => cat.categoryId,
      );
      setCategoryList(categoryIds);
    }
  }, [book]);

  const { data: categories, isFetching } = useGetCategories();

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
      description: book?.description || "",
      summary: book?.summary || "",
      totalCopies: book?.totalCopies || 0,
      publishDate: book?.publishDate
        ? new Date(book.publishDate).toISOString().split("T")[0]
        : "",
      pages: book?.pages || "0",
    },
  });

  // Get the filename
  const coverFile = watch("coverFile");
  const fileName = coverFile?.[0]?.name;

  useEffect(() => {
    if (coverFile?.[0]) {
      const url = URL.createObjectURL(coverFile[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [coverFile]);

  const { mutate: createBook, isPending: isCreating } = useCreateBook();
  const { mutate: updateBook, isPending: isUpdating } = useEditBook();

  function handleOnSubmit(data: z.infer<typeof schema>) {
    if (type === "CREATE") {
      const file = data.coverFile?.[0];

      if (!file) return;

      const payload: CreateBookParams = {
        title: data.title,
        author: data.author,
        categories: categoryList.length > 0 ? categoryList : [],
        description: data.description,
        coverFile: file,
        totalCopies: data.totalCopies,
        availableCopies: data.totalCopies,
        pages: data.pages,
        publishDate: data.publishDate,
        summary: data.summary,
      };

      createBook(payload, {
        onSuccess: () => {
          toast.success("Book created successfully");
          navigate("/admin/books");
        },
        onError: (error: Error) => {
          toast.error(`Creation Failed ${error.message}`);
        },
      });
    } else {
      const file = data.coverFile?.[0];

      const payload: EditBookParams = {
        title: data.title,
        author: data.author,
        categories: categoryList.length > 0 ? categoryList : [],
        description: data.description,
        coverFile: file ?? undefined,
        totalCopies: data.totalCopies,
        availableCopies: data.totalCopies,
        pages: data.pages,
        publishDate: data.publishDate,
        summary: data.summary,
      };

      updateBook(
        { bookId: book?.bookId ?? 0, params: payload },
        {
          onSuccess: () => {
            toast.success("Book updated successfully");
            navigate(`/admin/books/${book?.bookId}`);
          },
          onError: (error: Error) => {
            toast.error(`Updated Failed ${error.message}`);
          },
        },
      );
    }
  }

  if (isFetching) return null;

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
        <Label htmlFor="categories">Categories</Label>
        {isFetching ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No categories available
          </div>
        ) : (
          <Combobox
            onValueChange={(value) => {
              if (!value) return;
              // value is the categoryId directly, not an event
              if (!categoryList.includes(value)) {
                setCategoryList((prev) => [...prev, value]);
              }
            }}
            items={categories}
            itemToStringValue={({ name }: Category) => name}
          >
            <ComboboxInput placeholder="Select a framework" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(category: Category) => (
                  <ComboboxItem
                    className="flex justify-between px-2"
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.name}
                    {categoryList.includes(category.categoryId) && <Check />}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        )}
        {categoryList.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categoryList.map((categoryId) => {
              const category = categories.find(
                (c: Category) => c.categoryId === categoryId,
              );
              return category ? (
                <span
                  key={categoryId}
                  className="relative rounded bg-gray-200 px-2 py-1 text-sm"
                >
                  {category.name}
                  <button
                    type="button"
                    className="ml-1 cursor-pointer rounded-full px-1.5 hover:bg-gray-300"
                    onClick={() =>
                      setCategoryList((prev) =>
                        prev.filter((id) => id !== categoryId),
                      )
                    }
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
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
        <Label htmlFor="coverFile">
          Book Cover
          <span className="text-muted-foreground text-xs font-normal">
            ( Recommended: 800×1200px )
          </span>
        </Label>
        <div className="relative">
          <input
            type="file"
            id="coverFile"
            {...register("coverFile")}
            className="hidden"
            accept="image/*"
          />
          <label
            htmlFor="coverFile"
            className={cn(
              "group relative flex cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
              previewUrl || book?.coverUrl
                ? "border-primary/50 bg-primary/5"
                : "hover:border-primary/50 hover:bg-primary/5 border-gray-300 bg-gray-50",
            )}
          >
            {previewUrl || book?.coverUrl ? (
              // Preview mode with image
              <div className="relative w-full">
                <img
                  className="h-64 w-full object-contain"
                  src={previewUrl || book?.coverUrl}
                  alt="Book cover preview"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="text-center text-white">
                    <Image className="mx-auto mb-2 h-8 w-8" />
                    <p className="text-sm font-medium">Change cover image</p>
                    {fileName && (
                      <p className="mt-1 text-xs opacity-90">{fileName}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Empty state
              <div className="flex w-full flex-col items-center justify-center gap-3 px-6 py-12">
                <div className="bg-primary/10 rounded-full p-4">
                  <Image className="text-primary h-8 w-8" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    Upload book cover
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Click to browse or drag and drop
                  </p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              </div>
            )}
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

      <FormField
        id="pages"
        label="Book Pages"
        register={register}
        error={errors.pages}
        placeholder="e.g., 50"
        type="number"
      />

      <FormField
        id="publishDate"
        label="Publish Date"
        register={register}
        error={errors.publishDate}
        type="date"
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

      {type === "CREATE" ? (
        <Button disabled={isCreating}>
          {isCreating ? "Creating..." : "Create"}
        </Button>
      ) : (
        <Button disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save"}
        </Button>
      )}
    </form>
  );
};

export default BookForm;
