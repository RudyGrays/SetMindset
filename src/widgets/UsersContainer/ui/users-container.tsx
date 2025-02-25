"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { Input } from "@/shared/ui/input";
import { AllUsersList } from "@/widgets/AllUsersList/ui/all-users-list";
import { FriendsList } from "@/widgets/FriendsList/ui/friends-list";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const UsersContainer = ({
  selectedUser,
}: {
  selectedUser: UserEntity | UserWithIsFriend;
}) => {
  const [searchType, setSearchType] = useState<"friends" | "users">("friends");
  const [searchValue, setSearchValue] = useState("");

  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      setSearchType("users");
    } else {
      setSearchType("friends");
    }
  }, [debouncedSearchValue]);

  const changeSearchValue = useCallback(
    (value: string) => {
      setSearchValue(value);
    },
    [setSearchValue]
  );

  return (
    <div className="h-full">
      <div className="max-w-[800px] border rounded w-full mx-auto p-3">
        <Input
          className=""
          value={searchValue}
          onChange={(e) => changeSearchValue(e.target.value)}
          placeholder="Find user..."
        />
        {searchType === "friends" ? (
          <FriendsList user={selectedUser} />
        ) : (
          <AllUsersList
            searchValue={debouncedSearchValue}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
};
