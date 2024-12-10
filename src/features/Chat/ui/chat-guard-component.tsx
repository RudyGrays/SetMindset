"use client";

import { useSession } from "next-auth/react";
import { useChat } from "../model/hooks/use-chat";
import { useCurrentChat } from "../model/hooks/use-current-chat";
import { redirect, useRouter } from "next/navigation";
import { Chat } from "./chat";
import { Spinner } from "@/shared/ui/spinner";
import { useSidebar } from "@/shared/ui/sidebar";

export const ChatGuardComponent = ({ chatId }: { chatId: string }) => {
  const session = useSession();
  const myId = session.data?.user.id;
  const router = useRouter();
  const { chat, isLoading } = useCurrentChat(chatId);

  if (isLoading)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (!chat) return <div>Чат не существует</div>;

  const isMyChat = chat.user1Id === myId || chat.user2Id === myId;

  const currentUser = chat.user1Id === myId ? chat.user1 : chat.user2;
  const user2 = chat.user1Id === myId ? chat.user2 : chat.user1;

  const currentUserMessages = chat.messages.filter((message) => {
    if (message.senderId === currentUser.id) {
      return message;
    }
  });

  const user2Messages = chat.messages.filter((message) => {
    if (message.senderId !== currentUser.id) {
      return message;
    }
  });

  return (
    <Chat
      currentUserMessages={currentUserMessages}
      user2={user2}
      currentUser={currentUser}
      user2Messages={user2Messages}
      chatId={chatId}
    />
  );
};
