"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { useUsers } from "@/features/Users/model/hooks/use-users";
import { Spinner } from "@/shared/ui/spinner";
import UsersList from "@/widgets/UsersList/ui/users-list";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";
export const AllUsersList = ({
  user,
  searchValue,
}: {
  user: UserEntity;
  searchValue: string;
}) => {
  const session = useSession();
  const { users, isLoading } = useUsers(
    user.id!,
    session.data?.user.id!,
    searchValue !== "" ? searchValue : undefined
  );

  if (isLoading)
    return (
      <div className="h-full  w-full  flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="h-full   w-full  flex flex-col items-center  pt-6  p-3 ">
      <div>{`Users by "${searchValue ?? "..."}"`}</div>

      <UsersList users={users!} />
    </div>
  );
};
