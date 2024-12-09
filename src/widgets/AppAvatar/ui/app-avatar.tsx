import { UserEntity } from "@/features/Auth/model/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export const AppAvatar = ({
  image,
  className,
  username,
}: {
  image?: string;
  className?: string;
  username?: string;
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={image} alt={username} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
