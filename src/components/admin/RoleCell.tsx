import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalize } from "@/lib/utils";
import type { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useChangeUserRole } from "@/services/admin/mutations";
import DialogWrapper from "./DialogWrapper";

interface RoleCellProps {
  userId: string;
  userRole: UserRole;
}

const RoleCell = ({ userId, userRole }: RoleCellProps) => {
  const { user } = useAuth();
  const { mutate: changeRole, isPending } = useChangeUserRole();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isSelfAction = user?.id === userId;
  const isDisabled = isPending || isSelfAction;

  const handleRoleChange = (role: UserRole) => {
    if (isDisabled) return;

    changeRole(
      { userId, role },
      {
        onSuccess: () => {
          toast.success(
            `User role updated to ${capitalize(role)} successfully.`,
          );
          setDropdownOpen(false);
        },
        onError: (error: Error) => {
          toast.error(`Failed to update user role: ${error.message}`);
        },
      },
    );
  };

  const getDialogContent = (targetRole: UserRole) => {
    const isUpgrade = targetRole === "ADMIN";

    return {
      title: isUpgrade ? "Promote to Admin" : "Demote to User",
      description: isUpgrade
        ? "This user will gain access to the admin dashboard and be able to manage users, content, and system settings. Only promote trusted individuals."
        : "This user will lose admin privileges and access to the admin dashboard. They will only have standard user permissions.",
      btnText: isUpgrade ? "Promote to Admin" : "Demote to User",
    };
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild disabled={isDisabled}>
        <button
          className={`${
            userRole.toUpperCase() === "ADMIN"
              ? "bg-pink-50 text-pink-700"
              : "bg-primary/10 text-primary"
          } cursor-pointer rounded-2xl px-2.5 py-0.5 text-sm font-medium transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={isDisabled}
        >
          {capitalize(userRole)}
          {isSelfAction && " (You)"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* User Role Option */}
        <DialogWrapper
          type="WARNING"
          {...getDialogContent("USER")}
          onConfirm={() => handleRoleChange("USER")}
          disabled={isDisabled}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex cursor-pointer justify-between p-2"
          >
            <span className="bg-primary/10 text-primary rounded-2xl px-2.5 py-0.5 text-sm font-medium">
              User
            </span>
            {userRole.toUpperCase() === "USER" && (
              <Check className="text-primary h-4 w-4" />
            )}
          </DropdownMenuItem>
        </DialogWrapper>

        {/* Admin Role Option */}
        <DialogWrapper
          type="WARNING"
          {...getDialogContent("ADMIN")}
          onConfirm={() => handleRoleChange("ADMIN")}
          disabled={isDisabled}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex cursor-pointer justify-between p-2"
          >
            <span className="rounded-2xl bg-pink-50 px-2.5 py-0.5 text-sm font-medium text-pink-700">
              Admin
            </span>
            {userRole.toUpperCase() === "ADMIN" && (
              <Check className="h-4 w-4 text-pink-700" />
            )}
          </DropdownMenuItem>
        </DialogWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleCell;
