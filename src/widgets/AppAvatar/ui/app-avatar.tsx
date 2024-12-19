import { UserEntity } from "@/features/Auth/model/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export const AppAvatar = ({
  image,
  className,
  username,
  onClick,
}: {
  image?: string;
  className?: string;
  username?: string;
  onClick?: () => void;
}) => {
  return (
    <Avatar onClick={onClick} className={`${className}`}>
      <AvatarImage className="object-cover" src={image} alt={username} />
      <AvatarFallback className="object-cover border border-secondary-foreground">
        {username ? username.slice(0, 1) : "A"}
      </AvatarFallback>
    </Avatar>
  );
};
