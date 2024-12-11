"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { useFriends } from "@/features/Friends/model/hooks/use-friends";
import { Spinner } from "@/shared/ui/spinner";
import UsersList from "@/widgets/UsersList/ui/users-list";

export const FriendsList = ({
  user,
}: {
  user: UserEntity | UserWithIsFriend;
}) => {
  const { friends, isLoading } = useFriends(user.id!);
  if (isLoading)
    return (
      <div className="h-full w-full  flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="h-full   w-full  flex flex-col items-center justify-center  p-3 ">
      <div>{`${user.name}'s friends`}</div>

      <UsersList users={friends!} />
    </div>
  );
};
