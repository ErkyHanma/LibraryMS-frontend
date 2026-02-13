import type { EditProfileParams, User } from "@/types";
import { Edit2Icon } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState, type ReactNode } from "react";
import { useEditProfile } from "@/services/books/mutations";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/lib/validation";
import type z from "zod";
import { DialogTitle } from "@radix-ui/react-dialog";

const EditProfileDialog = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { mutate: editProfile, isPending } = useEditProfile();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
    },
  });

  const profileImageFile = watch("profileImageFile");

  useEffect(() => {
    if (profileImageFile?.[0]) {
      const url = URL.createObjectURL(profileImageFile[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [profileImageFile]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }

        reset({
          name: user.name,
          lastName: user.lastName,
          profileImageFile: undefined,
        });
      }, 1000); // Wait 1 second after dialog closes before resetting

      return () => clearTimeout(timer);
    }
  }, [open, reset, user.name, user.lastName, previewUrl]);

  function handleOnSubmit(data: z.infer<typeof EditUserSchema>) {
    const file = data.profileImageFile?.[0];

    const payload: EditProfileParams = {
      name: data.name,
      lastName: data.lastName,
      ProfileImageFile: file ?? null,
    };

    editProfile(
      { userId: user.id, params: payload },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
        },
        onError: (error: Error) => {
          toast.error(`Update Failed ${error.message}`);
        },
        onSettled: () => {
          setOpen(false);
        },
      },
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-160">
        <DialogTitle className="hidden">Edit Profile</DialogTitle>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="space-y-6 py-4">
            {/* Profile Photo Section */}
            <div className="flex items-start gap-6 border-b pb-6">
              <Label className="flex-1 pt-2 text-base font-medium">
                Profile photo
              </Label>
              <div className="flex flex-2 items-center justify-center">
                <div className="relative">
                  <UserAvatar
                    width={100}
                    height={100}
                    textSize={40}
                    profileImageUrl={previewUrl || user.profileImageUrl}
                    fullname={`${user.name} ${user.lastName}`}
                  />
                  <label
                    htmlFor="profile-image-file"
                    className="absolute -right-2 -bottom-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-all duration-200 hover:bg-gray-700"
                  >
                    <Edit2Icon className="h-4 w-4" />
                    <input
                      type="file"
                      id="profile-image-file"
                      {...register("profileImageFile")}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>

            {/* Name Section */}
            <div className="flex items-start gap-6 border-b pb-6">
              <Label
                htmlFor="name"
                className="flex-2 pt-2 text-base font-medium"
              >
                Name
              </Label>
              <div className="flex flex-6 flex-col justify-center space-y-2">
                <Input
                  className="rounded-sm border border-gray-300 bg-white text-sm transition-all focus-within:ring-0 focus-within:outline-0 focus:border-transparent focus:ring-0"
                  placeholder={"Joe"}
                  id={"name"}
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex-1 sm:flex-2"></div>
            </div>

            {/* Last Name Section */}
            <div className="flex items-start gap-6 border-b pb-6">
              <Label
                htmlFor="lastName"
                className="flex-2 pt-2 text-base font-medium"
              >
                Last name
              </Label>
              <div className="flex flex-6 flex-col justify-center space-y-2">
                <Input
                  className="rounded-sm border border-gray-300 bg-white text-sm transition-all focus-within:ring-0 focus-within:outline-0 focus:border-transparent focus:ring-0"
                  placeholder={"Doe"}
                  id={"lastName"}
                  {...register("lastName")}
                />
                {errors?.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="flex-1 sm:flex-2"></div>
            </div>

            {/* University ID (Read-only) */}
            <div className="flex items-start gap-6">
              <Label className="flex-2 pt-2 text-base font-medium">
                University ID
              </Label>
              <div className="flex flex-6 items-center justify-center space-y-2">
                <div className="flex flex-6 flex-col items-center justify-center space-y-2">
                  <Input
                    id="lastName"
                    value={user.universityId}
                    className="rounded-sm border border-gray-300 bg-white text-sm transition-all focus-within:ring-0 focus-within:outline-0 focus:border-transparent focus:ring-0"
                    disabled
                  />
                  <p className="text-muted-foreground mt-2 text-xs">
                    Your University ID cannot be changed.
                  </p>
                </div>
              </div>
              <div className="flex-1 sm:flex-2"></div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="min-w-25">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 min-w-25 px-14 text-white"
            >
              {isPending ? "Saving" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
