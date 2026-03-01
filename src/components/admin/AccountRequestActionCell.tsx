import DialogWrapper from "./DialogWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Check, CircleAlert, X } from "lucide-react";
import { useChangeAccountRequestStatus } from "@/services/admin/mutations";
import type { AccountRequestStatus } from "@/types";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useAuth } from "@/contexts/AuthContext";

const AccountRequestActionCell = ({
  status,
  accountRequestId,
}: {
  status: AccountRequestStatus;
  accountRequestId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState<string | undefined>();
  const { user } = useAuth();
  const { mutate: changeStatus, isPending } = useChangeAccountRequestStatus();

  const isNotResponded = status.toUpperCase() === "PENDING";

  const handleStatusChange = (
    newStatus: AccountRequestStatus,
    rejectionReason?: string,
  ) => {
    if (!isNotResponded || !user) return;

    changeStatus(
      {
        accountRequestId,
        status: newStatus,
        userId: user?.id,
        rejectionReason: rejectionReason,
      },
      {
        onSuccess: () => {
          toast.success(`Request desicion send successfully!`);
        },
        onError: (error: Error) => {
          toast.error(`Failed to change request. ${error.message}`);
        },
        onSettled: () => {
          setOpen(false);
        },
      },
    );
  };

  return isNotResponded ? (
    <div className="flex gap-3">
      <DialogWrapper
        type="SUCCESS"
        title="Approve Account Request"
        description="Approve the student's account request and grant access. A confirmation email will be sent upon approval."
        btnText={
          isPending ? "Sending decision..." : "Approve & Send Confirmation"
        }
        onConfirm={() => handleStatusChange("APPROVED")}
        disabled={isPending}
      >
        <button
          disabled={isPending}
          className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-green-100 p-2 font-medium text-green-700 transition duration-100 hover:bg-green-50"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center">
                <Check className="size-5" />
              </span>
            </TooltipTrigger>
            <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
              <p>Approve</p>
            </TooltipContent>
          </Tooltip>
        </button>
      </DialogWrapper>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            disabled={isPending}
            className="flex cursor-pointer items-center justify-center gap-1 rounded-full bg-red-100 p-2 font-medium text-red-700 transition duration-100 hover:bg-red-50"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  <X className="size-5" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
                <p>Reject</p>
              </TooltipContent>
            </Tooltip>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-100">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="flex h-22 w-22 items-center justify-center rounded-full bg-red-700/25">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700">
                <CircleAlert className="size-8 text-white" />
              </div>
            </div>

            <DialogTitle>Reject Account Request</DialogTitle>
            <DialogDescription className="text-center">
              Reject the student's account request and restrict access. A
              notification email will be sent upon decision.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="rejectionReason">Rejection Reason</Label>
            <Textarea
              rows={8}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Send an optional reason for rejection"
              className="mb-8 max-h-60 min-h-32 resize-none rounded-sm border border-gray-300 bg-white text-sm transition-all focus-within:ring-0 focus-within:outline-0 focus:border-transparent focus:ring-0"
              id="rejectionReason"
            />

            <Button
              disabled={isPending}
              className="w-full bg-red-700 text-white hover:bg-red-600"
              onClick={() => handleStatusChange("REJECTED", rejectionReason)}
            >
              {isPending ? "Sending decision" : "Reject & Send decision"}
            </Button>
            <DialogClose>
              <Button variant={"outline"} className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ) : (
    <a
      href={`/admin/account-requests/${accountRequestId}`}
      className="flex cursor-pointer gap-4 rounded-md bg-gray-200 px-3 py-1 transition duration-100 hover:bg-gray-300"
    >
      View
    </a>
  );
};

export default AccountRequestActionCell;
