import { dateConverter } from "@/lib/utils";
import type { User } from "@/types";
import { Calendar, IdCard, Mail } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";

const ProfileSidebar = ({ user }: { user: User }) => {
  return (
    <div className="w-full md:max-w-75 lg:max-w-87.5">
      <div className="sticky top-22 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <UserAvatar
            width={84}
            height={84}
            textSize={34}
            profileImageUrl={user.profileImageUrl}
            fullname={user.name + " " + user.lastName}
          />
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
                {dateConverter(user.joinedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
