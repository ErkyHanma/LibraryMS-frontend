import DialogWrapper from "./DialogWrapper";
import { Edit3, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { useDeleteCategory } from "@/services/admin/mutations";

const CategoryActionCell = ({
  categoryId,
  booksCount,
}: {
  categoryId: number;
  booksCount: number;
}) => {
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  return (
    <div className="flex items-center gap-1">
      <Link
        to={`/admin/category/edit/${2}`}
        className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-blue-100"
      >
        <Edit3 className="size-5 text-blue-500" />
      </Link>

      <DialogWrapper
        type="DANGER"
        title="Delete Category"
        description={
          booksCount > 0
            ? `This category has ${booksCount} ${booksCount === 1 ? "book" : "books"} assigned to it. Deleting this category will remove the category from all associated books. Are you sure you want to proceed?`
            : "Are you sure you want to delete this category permanently? This action cannot be undone."
        }
        btnText={isPending ? "Deleting..." : "Delete"}
        onConfirm={() => deleteCategory(categoryId)}
        disabled={isPending}
      >
        <button className="flex cursor-pointer items-center justify-center gap-4 rounded-full p-1.5 transition duration-100 hover:scale-105 hover:bg-red-100">
          <Trash2Icon className="size-5 text-red-500" />
        </button>
      </DialogWrapper>
    </div>
  );
};

export default CategoryActionCell;
