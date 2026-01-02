import { type ReactNode } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleAlert } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

interface RejectAccountDialogProps {
  children: ReactNode;
  onConfirm: () => void;
  type: "BOOK" | "ACCOUNT";
}

const RejectDialog = ({
  children,
  type,
  onConfirm,
}: RejectAccountDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex h-22 w-22 items-center justify-center rounded-full bg-red-700/25">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700">
              <CircleAlert className="size-8 text-white" />
            </div>
          </div>

          <DialogTitle>
            {type === "BOOK"
              ? "Decline Book Request"
              : "Decline Account Request"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {type === "BOOK"
              ? "Decline the student book request. A notification email will be sent upon decision."
              : "Decline the student's account request and restrict access. A notification email will be sent upon decision."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2">
          <Button
            className="w-full bg-red-700 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Decline & Send decision
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

export default RejectDialog;
