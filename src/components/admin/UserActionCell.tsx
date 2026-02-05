import { Ban, UserCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import DialogWrapper from "./DialogWrapper";
import { useChangeUserStatus } from "@/services/admin/mutations";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import clsx from "clsx";
import type { UserStatus } from "@/types";

const UserActionCell = ({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) => {
  const { user } = useAuth();
  const { mutate: changeStatus, isPending } = useChangeUserStatus();

  const isBlocked = status.toLowerCase() === "blocked";
  const isSelfAction = user?.id === userId;
  const isDisabled = isPending || isSelfAction;

  const newStatus: UserStatus = isBlocked ? "APPROVED" : "BLOCKED";

  const handleStatusChange = () => {
    if (isDisabled) return;

    changeStatus(
      { userId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(
            `User access ${isBlocked ? "granted" : "restricted"} successfully.`,
          );
        },
        onError: (error: Error) => {
          toast.error(`Failed to update user access. ${error.message}`);
        },
      },
    );
  };

  return isBlocked ? (
    <DialogWrapper
      type="SUCCESS"
      title="Grant User Access"
      description="Grant the student access to the system. A notification email will be sent."
      btnText="Grant Access & Notify"
      onConfirm={handleStatusChange}
      disabled={isDisabled}
    >
      <button
        disabled={isDisabled}
        className={clsx(
          "flex items-center justify-center gap-4 rounded-full p-1.5 transition duration-100",
          !isDisabled && ["cursor-pointer hover:scale-105 hover:bg-green-100"],
          isDisabled && "cursor-not-allowed bg-gray-100 opacity-60",
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center">
              <UserCheck
                className={clsx(
                  "size-5",
                  isDisabled ? "text-gray-400" : "text-green-500",
                )}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
            <p>
              {isSelfAction
                ? "You cannot change your own status"
                : isPending
                  ? "Updating status..."
                  : "Grant Access"}
            </p>
          </TooltipContent>
        </Tooltip>
      </button>
    </DialogWrapper>
  ) : (
    <DialogWrapper
      type="DANGER"
      title="Restrict User Access"
      description="Restrict the student's access to the system. A notification email will be sent."
      btnText="Restrict Access & Notify"
      onConfirm={handleStatusChange}
      disabled={isDisabled}
    >
      <button
        disabled={isDisabled}
        className={clsx(
          "flex items-center justify-center gap-4 rounded-full p-1.5 transition duration-100",
          !isDisabled && ["cursor-pointer hover:scale-105 hover:bg-red-100"],
          isDisabled && "cursor-not-allowed bg-gray-100 opacity-60",
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center">
              <Ban
                className={clsx(
                  "size-5",
                  isDisabled ? "text-gray-400" : "text-red-500",
                )}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent className="border-2 border-gray-300 bg-gray-100 font-medium text-gray-700">
            <p>
              {isSelfAction
                ? "You cannot change your own status"
                : isPending
                  ? "Updating status..."
                  : "Restric Access"}
            </p>
          </TooltipContent>
        </Tooltip>
      </button>
    </DialogWrapper>
  );
};

export default UserActionCell;
