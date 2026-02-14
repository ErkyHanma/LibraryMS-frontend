import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory, useEditCategory } from "@/services/admin/mutations";

import type { Category, CategoryParams } from "@/types";
import { FolderPlus, FolderEdit } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

interface CategoryFormProps {
  type: "CREATE" | "EDIT";
  children: ReactNode;
  category?: Category;
}

const CategoryForm = ({ type, children, category }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: category?.name ?? "",
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: editCategory, isPending: isEditing } = useEditCategory();

  const isPending = isCreating || isEditing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    if (trimmedName.length > 100) {
      setError("Category name must be less than 100 characters");
      return;
    }

    const payload: CategoryParams = {
      name: trimmedName,
    };

    if (type === "CREATE") {
      createCategory(payload, {
        onSuccess: () => {
          toast.success("Category created successfully");
          setFormData({ name: "" });
        },
        onError: (error) => {
          toast.error(error.message || "Unable to create category");
        },
        onSettled: () => {
          if (!isCreating) {
            setOpen(false);
          }
        },
      });
    } else {
      if (!category) return;

      editCategory(
        { categoryId: category.categoryId, params: payload },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
          },
          onError: (error) => {
            toast.error(error.message || "Unable to update category");
          },
          onSettled: () => {
            if (!isEditing) {
              setOpen(false);
            }
          },
        },
      );
    }
  };

  const isCreateMode = type === "CREATE";
  const Icon = isCreateMode ? FolderPlus : FolderEdit;
  const iconBgColor = isCreateMode ? "bg-primary/25" : "bg-blue-500/25";
  const iconColor = isCreateMode ? "bg-primary" : "bg-blue-500";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${iconBgColor}`}
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full ${iconColor}`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
          </div>

          <DialogTitle>
            {isCreateMode ? "Create New Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isCreateMode
              ? "Create a new book category to organize your library collection."
              : `Update the details for the "${category?.name}" category.`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={formData.name}
              onChange={(e) => {
                setFormData({ name: e.target.value });
                setError(""); // Clear error on change
              }}
              placeholder="e.g., Science Fiction, History, Biography"
              className={error ? "border-destructive" : ""}
              disabled={isPending}
              autoFocus
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          <div className="flex gap-2 pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className={`flex-1 ${isCreateMode ? "bg-primary hover:bg-primary/90" : "bg-blue-600 hover:bg-blue-700"} text-white`}
              disabled={isPending}
            >
              {isPending
                ? isCreateMode
                  ? "Creating..."
                  : "Saving..."
                : isCreateMode
                  ? "Create Category"
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
