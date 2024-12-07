import { UserEntity } from "@/features/Auth/model/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";

export const ProfileCard = ({ user }: { user: UserEntity }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль пользователя: {user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Почта: {user.email}</div>
        <AppAvatar image={user.image!} />
      </CardContent>
    </Card>
  );
};
