import UserAvatar from "./UserAvatar";

type UserCardType = {
  name: string;
  lastName: string;
  profileImageUrl: string;
  email: string;
};

const UserCard = ({ name, lastName, profileImageUrl, email }: UserCardType) => {
  return (
    <div className="flex w-full max-w-80 flex-col items-center rounded-lg bg-gray-50 px-2 py-4">
      <UserAvatar
        fullname={name + " " + lastName}
        profileImageUrl={profileImageUrl}
        width={48}
        height={48}
        textSize={18}
      />
      <p className="line-clamp-1 font-medium">{name + " " + lastName}</p>
      <p className="max-w-[95%] truncate text-sm text-gray-400">{email}</p>
    </div>
  );
};

export default UserCard;
