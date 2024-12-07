import { UserEntity } from "@/features/Auth/model/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export const AppAvatar = ({
  image,
  className,
}: {
  image?: string;
  className?: string;
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
