import { useBorrowBookAction } from "@/services/books/mutations";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { BookCheckIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const BorrowBookBtnAction = ({
  bookId,
  bookTitle,
}: {
  bookId: number;
  bookTitle: string;
}) => {
  const { mutate: borrowBook, isPending } = useBorrowBookAction();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isDemo } = useAuth();

  const handleBorrowBook = () => {
    if (!user || !isAuthenticated) return;

    if (isDemo)
      return toast.error(
        `Demo accounts cannot borrow books. Sign up for a full account to start borrowing.`,
      );

    if (user.status.toUpperCase() !== "APPROVED") {
      toast.error(
        `You account hasn't been approved yet. An email will be sent upon your email when decison it's made`,
      );

      setOpen(false);
      return;
    }

    return borrowBook(
      { bookId: bookId, userId: user?.id },
      {
        onSuccess: () => {
          toast.success(
            "Book borrowed successfully! Check your borrowed books to track the due date.",
          );
        },
        onError: (error: Error) => {
          toast.error(`Unable to borrow book: ${error.message}`);
        },
        onSettled: () => {
          setOpen(false);
        },
      },
    );
  };

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="form-btn px-6 sm:px-14 py-5">Borrow Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="bg-primary/25 flex h-22 w-22 items-center justify-center rounded-full">
            <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full">
              <BookCheckIcon className="size-8 text-white" />
            </div>
          </div>

          <DialogTitle>Confirm Book Borrowing</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3 text-center">
              <p>
                You are about to borrow{" "}
                <span className="text-foreground font-semibold">
                  "{bookTitle}"
                </span>
                .
              </p>

              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <p className="text-foreground mb-2 font-medium">
                  Borrowing Period:
                </p>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-foreground font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span className="text-muted-foreground">→</span>

                  <span className="text-primary font-semibold">
                    {dueDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-muted-foreground mt-2 text-xs">
                  (14 days from today)
                </p>
              </div>

              <p className="text-sm">
                Please return the book by the due date to avoid late fees.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2">
          <Button
            onClick={handleBorrowBook}
            disabled={isPending || isDemo}
            className="bg-primary hover:bg-primary/90 w-full text-white"
          >
            {isPending ? "Processing..." : "Confirm Borrowing"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookBtnAction;
