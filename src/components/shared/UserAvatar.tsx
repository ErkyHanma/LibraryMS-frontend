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
  const validImageUrl = profileImageUrl?.trim() || undefined;

  return (
    <Avatar
      style={{ width: width, height: height }}
      className="text-white "
    >
      <AvatarImage src={validImageUrl} />
      <AvatarFallback style={{ fontSize: textSize }} className="bg-primary">
        {getInitials(fullname)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
