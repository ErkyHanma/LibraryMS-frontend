import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";

type UserAvatarProps = {
  name: string;
  profileImage: string;
};

const UserAvatar = ({ name, profileImage }: UserAvatarProps) => {
  return (
    <Avatar className="text-white">
      <AvatarImage src={profileImage} />
      <AvatarFallback className="bg-primary">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
