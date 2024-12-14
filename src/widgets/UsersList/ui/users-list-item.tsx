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
import { useCreateChat } from "@/features/Chat/model/hooks/use-create-chat";
import { useRouter } from "next/navigation";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useAddFriend } from "@/features/Friends/model/hooks/use-add-friend";
import { useCreateNotification } from "@/features/Notifications/model/hooks/use-create-notification";
import { queryClient } from "@/shared/api/query-client";
import { useUsers } from "@/features/Users/model/hooks/use-users";
import { CallButton } from "@/widgets/CallButton/ui/call-button";

export const UsersListItem = ({ user }: { user: UserWithIsFriend }) => {
  const session = useSession();
  const { chats } = useChat(user.id!);
  const { onlineUsers, handleCall } = useSocket();
  const myId = session.data?.user.id;

  const receiverSocketUser = onlineUsers?.find(
    (ruser) => ruser.userId === user.id
  );

  const chatIdWithUser = chats?.find(
    (chat) => chat.user1Id === myId || chat.user2Id === myId
  )?.id;
  const chatWithUser = chats?.find(
    (chat) => chat.user1Id === myId || chat.user2Id === myId
  );
  const { mutate } = useCreateChat(myId!, user.id!);
  const router = useRouter();

  const { addUserMutate, data } = useAddFriend(myId!, user.id!);

  return (
    <div key={user.id} className="">
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
            {user.isFriend && (
              <div className="flex gap-3">
                <Button
                  variant={"ghost"}
                  className="flex gap-2 items-center hover:bg-background p-2 rounded"
                  onClick={() => {
                    if (!chatIdWithUser) {
                      return mutate();
                    }
                    return router.push(`chats/${chatWithUser?.id}`);
                  }}
                >
                  <MessageCircleMore size={22} />
                  Message
                </Button>
                {/* <CallButton userId={user.id} /> */}
              </div>
            )}
            {!user.isFriend && !user.isRequest && (
              <Button
                onClick={() => {
                  addUserMutate();
                }}
                className="hover:bg-background"
                variant={"ghost"}
              >
                Add friend
              </Button>
            )}
            {!user.isFriend && user.isRequest && <div>Request send</div>}
          </div>
        </div>
        <UserOptions user={user} />
      </div>
    </div>
  );
};
