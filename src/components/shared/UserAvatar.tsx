import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type UserAvatarProps = {
  fullname: string;
  profileImageUrl?: string;
  width?: number;
  height?: number;
  textSize?: number;
};

const UserAvatar = ({
  fullname,
  profileImageUrl,
  width = 36,
  height = 36,
  textSize = 16,
}: UserAvatarProps) => {
  return (
    <Avatar
      style={{ width: width, height: height }}
      className="border-primary text-white transition duration-300 hover:border-2"
    >
      <AvatarImage src={profileImageUrl} />
      <AvatarFallback style={{ fontSize: textSize }} className="bg-primary">
        {getInitials(fullname)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
