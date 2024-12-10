"use client";
import { UserEntity } from "@/entities/User/model/types/User";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { MessageCircleMore, Video } from "lucide-react";
import Link from "next/link";
import { UserOptions } from "./user-options";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { Button } from "@/shared/ui/button";
import { useChat } from "@/features/Chat/model/hooks/use-chat";
import { useSession } from "next-auth/react";

export const UsersListItem = ({ user }: { user: UserWithIsFriend }) => {
  const session = useSession();
  const { chats } = useChat(user.id!);
  const myId = session.data?.user.id;
  const haveChatWithMe = chats?.reduce((acc, item) => {
    if (
      item.user1Id === session.data?.user.id ||
      item.user2Id === session.data?.user.id
    ) {
      return true;
    }
    return acc;
  }, false);

  const chatIdWithUser = chats?.find(
    (chat) => chat.user1Id === myId || chat.user2Id === myId
  )?.id;

  return (
    <li key={user.id} className="">
      <div className="p-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link href={`/profile/${user.id}`}>
            <AppAvatar
              className="border h-16 w-16"
              image={user.image!}
              username={user.name!}
            />
          </Link>
          <div className="flex flex-col gap-3">
            <p className="font-semibold px-2">{user.name}</p>
            {user.isFriend ? (
              <div className="flex gap-3">
                <Button
                  variant={"ghost"}
                  onClick={() => {}}
                  className="flex gap-2 items-center hover:bg-background p-2 rounded"
                >
                  <MessageCircleMore size={22} />
                  <Link href={`/chats/${chatIdWithUser}`} className="text-sm">
                    {haveChatWithMe ? "написать" : "написать впервые"}
                  </Link>
                </Button>
                <Link
                  href={`/call/${user.id}`}
                  className="flex gap-2 items-center hover:bg-background p-2 rounded"
                >
                  <Video size={22} />
                  <p className="text-sm">Videocall</p>
                </Link>
              </div>
            ) : (
              <div>Not friends</div>
            )}
          </div>
        </div>
        <UserOptions user={user} />
      </div>
    </li>
  );
};
