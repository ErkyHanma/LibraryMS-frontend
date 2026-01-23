import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  profileImage: string;
};

const UserAvatar = ({ name, profileImage }: UserAvatarProps) => {
  return (
    <Avatar className="border-primary text-white transition duration-300 hover:border-2">
      <AvatarImage src={profileImage} />
      <AvatarFallback className="bg-primary">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
