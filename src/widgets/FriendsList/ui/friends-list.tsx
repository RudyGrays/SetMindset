"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { useFriends } from "@/features/Friends/model/hooks/use-friends";
import { Spinner } from "@/shared/ui/spinner";
import UsersList from "@/widgets/UsersList/ui/users-list";
import { useSession } from "next-auth/react";

export const FriendsList = ({
  user,
}: {
  user: UserEntity | UserWithIsFriend;
}) => {
  const { friends, isLoading } = useFriends(user.id!);
  const session = useSession();
  const myId = session.data?.user.id;
  if (isLoading)
    return (
      <div className="h-full w-full  flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="h-full   w-full  flex flex-col items-center  p-3 pt-6">
      <div>{`${user.id === myId ? "Your's" : user.name}'s friends`}</div>

      <UsersList users={friends!} />
    </div>
  );
};
