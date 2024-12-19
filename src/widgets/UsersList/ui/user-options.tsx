"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { removeFriend } from "@/features/Friends/model/actions/removeFriend";
import { useAddFriend } from "@/features/Friends/model/hooks/use-add-friend";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { useQueryClient } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const UserOptions = ({ user }: { user: UserWithIsFriend }) => {
  const session = useSession();
  const myId = session.data?.user.id!;
  const { addUserMutate } = useAddFriend(myId, user.id!);

  const { toast } = useToast();
  const queryClient = useQueryClient();
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
          <DropdownMenuItem
            onClick={() => {
              addUserMutate();
            }}
          >
            Add friend
          </DropdownMenuItem>
        )}
        {user.isFriend && (
          <DropdownMenuItem
            onClick={async () => {
              await removeFriend(myId!, user.id!);
              queryClient.refetchQueries({
                queryKey: ["friends"],
              });
              toast({
                title: "Успешно удалено!",
              });
            }}
          >
            Delete friend
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
