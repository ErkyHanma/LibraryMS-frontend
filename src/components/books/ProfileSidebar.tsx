import { formatDate } from "@/lib/utils";
import type { User } from "@/types";
import { Calendar, Edit3Icon, IdCard, Mail } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";

import EditProfileDialog from "./EditProfileDialog";

const ProfileSidebar = ({ user }: { user: User }) => {
  return (
    <div className="w-full md:max-w-75 lg:max-w-87.5">
      <div className="sticky top-22 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="group relative mb-2">
            <UserAvatar
              width={84}
              height={84}
              textSize={34}
              profileImageUrl={user.profileImageUrl}
              fullname={`${user.name} ${user.lastName}`}
            />
            <EditProfileDialog user={user}>
              <button
                type="button"
                className="bg-primary absolute -right-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95"
                aria-label="Edit profile picture"
              >
                <Edit3Icon className="h-3.5 w-3.5" />
              </button>
            </EditProfileDialog>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            {user.name + " " + user.lastName}
          </h2>
          <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Active Member
          </span>
        </div>

        <div className="mt-6 space-y-4 border-t pt-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm break-all text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IdCard className="mt-0.5 h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">University ID</p>
              <p className="text-sm text-wrap text-gray-900">
                {user.universityId}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm text-gray-900">
                {formatDate(user.joinedAt)}
              </p>
            </div>
          </div>

          <div className="border- mt-6 flex w-full space-y-4 pt-6 border-t">
            <div className="flex w-full items-center justify-center ">
              <EditProfileDialog user={user}>
                <Button className="w-full">Edit Profile</Button>
              </EditProfileDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
