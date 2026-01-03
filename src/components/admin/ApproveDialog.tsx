import { type ReactNode } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

interface ApproveDialogProps {
  children: ReactNode;
  type: "BOOK" | "ACCOUNT";
  onConfirm: () => void;
}

const ApproveDialog = ({ children, type, onConfirm }: ApproveDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex h-22 w-22 items-center justify-center rounded-full bg-green-800/25">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800">
              <Check className="size-8 text-white" />
            </div>
          </div>

          <DialogTitle>
            {type === "BOOK"
              ? "Approve Book Request"
              : "Approve Account Request"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {type === "BOOK"
              ? "Approve the student book request. A confirmation email will be sent upon approval."
              : "Approve the student's account request and grant access. A confirmation email will be sent upon approval."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2">
          <Button
            className="w-full bg-green-800 text-white hover:bg-green-700"
            onClick={onConfirm}
          >
            Approve & Send Confirmation
          </Button>
          <DialogClose>
            <Button variant={"outline"} className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
