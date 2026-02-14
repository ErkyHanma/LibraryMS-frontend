import { useState, type ReactNode } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Check, CircleAlert, TriangleAlert } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface DialogWrapperProps {
  children: ReactNode;
  onConfirm: () => void;
  type: "SUCCESS" | "DANGER" | "WARNING";
  title: string;
  description: string;
  btnText: string;
  disabled?: boolean;
}

const DialogWrapper = ({
  children,
  type,
  onConfirm,
  title,
  description,
  btnText,
  disabled,
}: DialogWrapperProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();

    if (!disabled) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-100">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "flex h-22 w-22 items-center justify-center rounded-full",
              {
                "bg-red-700/25": type === "DANGER",
                "bg-green-800/25": type === "SUCCESS",
                "bg-amber-500/25": type === "WARNING",
              },
            )}
          >
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full",
                {
                  "bg-red-700": type === "DANGER",
                  "bg-green-800": type === "SUCCESS",
                  "bg-amber-500": type === "WARNING",
                },
              )}
            >
              {type === "SUCCESS" ? (
                <Check className="size-8 text-white" />
              ) : type === "WARNING" ? (
                <TriangleAlert className="size-8 text-white" />
              ) : (
                <CircleAlert className="size-8 text-white" />
              )}
            </div>
          </div>

          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2">
          <Button
            disabled={disabled}
            className={cn("w-full text-white", {
              "bg-red-700 hover:bg-red-600": type === "DANGER",
              "bg-green-800 hover:bg-green-700": type === "SUCCESS",
              "bg-amber-500 hover:bg-amber-600": type === "WARNING",
            })}
            onClick={handleConfirm}
          >
            {btnText}
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

export default DialogWrapper;
