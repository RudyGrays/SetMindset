"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { useAddFriend } from "@/features/Friends/model/hooks/use-add-friend";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Ellipsis } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export const UserOptions = ({ user }: { user: UserWithIsFriend }) => {
  const session = useSession();
  const myId = session.data?.user.id!;
  const { addUserMutate } = useAddFriend(myId, user.id!);
  const { socket } = useSocket();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/profile/${user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/friends/${user.id}`}>Friends</Link>
        </DropdownMenuItem>
        {!user.isFriend && (
          <DropdownMenuItem onClick={() => {}}>Add friend</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
