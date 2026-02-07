import type { BorrowStatus } from "@/types";
import { CheckCircle, ReceiptText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import DialogWrapper from "./DialogWrapper";
import { useReturnBorrowedBookAction } from "@/services/admin/mutations";
import { toast } from "sonner";

interface BorrowedBooksActionCellProps {
  borrowedBookId: number;
  status: BorrowStatus;
}

const BorrowedBooksActionCell = ({
  borrowedBookId,
  status,
}: BorrowedBooksActionCellProps) => {
  const { mutate: returnBorrowedBook, isPending } =
    useReturnBorrowedBookAction();

  const handleReturnBorrowedBookAction = async () => {
    returnBorrowedBook(borrowedBookId, {
      onSuccess: () => {
        toast.success("Book successfully marked as returned");
      },
      onError: (error: Error) => {
        toast.error(`Unable to mark book as returned: ${error.message}`);
      },
    });
  };

  const isReturned = status === "RETURNED" || status === "LATE RETURN";

  return (
    <div className="flex gap-3">
      <button
        disabled={isReturned}
        className={`bg-primary/10 text-primary hover:bg-primary/15 flex items-center justify-center gap-1 rounded-full px-2 py-1.5 font-medium transition duration-100 ${isReturned ? "hover:bg-primary/10 opacity-50" : "cursor-pointer"} `}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center">
              <ReceiptText className="size-5" />
            </span>
          </TooltipTrigger>
          <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
            <p>
              {isReturned ? "Receipt already generated" : "Generate receipt"}
            </p>
          </TooltipContent>
        </Tooltip>
      </button>

      <DialogWrapper
        type="SUCCESS"
        title="Confirm Book Return"
        description="Mark this book as returned and update the borrowing record. This action will close the active loan for this book."
        btnText={isPending ? "Processing return..." : "Confirm Return"}
        onConfirm={handleReturnBorrowedBookAction}
        disabled={isPending}
      >
        <button
          disabled={isReturned}
          className={`flex items-center justify-center gap-1 rounded-full bg-green-50 px-2 py-1.5 font-medium text-green-700 transition duration-100 hover:bg-green-100 ${isReturned ? "opacity-50 hover:bg-green-100" : "cursor-pointer"} `}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center">
                <CheckCircle className="size-5" />
              </span>
            </TooltipTrigger>
            <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
              <p>
                {isReturned ? "Book already returned" : "Mark book as returned"}
              </p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DialogWrapper>
    </div>
  );
};

export default BorrowedBooksActionCell;
