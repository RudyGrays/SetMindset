"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { Message } from "@prisma/client";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { ChatMessage } from "./chat-message";
import { Button } from "@/shared/ui/button";
import { useSidebar } from "@/shared/ui/sidebar";
import { Input } from "@/shared/ui/input";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useMessages } from "../model/hooks/use-messages";
import { useSendMessage } from "../model/hooks/use-send-message";

import { nanoid } from "nanoid";
interface ChatProps {
  currentUser: UserEntity;
  user2: UserEntity;
  currentUserMessages?: Message[];
  user2Messages?: Message[];
  chatId: string;
}
export const Chat: FC<ChatProps> = memo(
  ({ currentUser, user2, currentUserMessages, user2Messages, chatId }) => {
    const [localMessages, setMessages] = useState<Message[]>([]);
    const [newMessageContent, setNewMessage] = useState("");

    const { socket } = useSocket();

    const { messages } = useMessages(localMessages);

    const newMessageInputHandler = (value: string) => {
      setNewMessage(value);
    };

    const mutation = useSendMessage(chatId, currentUser.id!, newMessageContent);

    const sendMessage = async () => {
      console.log(newMessageContent);

      const newMessage: Message = {
        id: parseInt(nanoid(10), 36),
        chatId: +chatId,
        content: newMessageContent,
        createdAt: new Date(),
        senderId: currentUser.id!,
      };

      socket?.emit("sendMessage", newMessage);

      mutation.mutate(newMessage);
    };

    useEffect(() => {
      socket?.on("receiveMessage", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }, [messages]);

    const getUser = useCallback(
      (message: Message) =>
        message.senderId === currentUser.id ? currentUser : user2,
      [currentUser, user2]
    );

    useEffect(() => {
      let newMessages: Message[] = [];

      if (currentUserMessages && currentUserMessages?.length > 0) {
        newMessages = [...newMessages, ...currentUserMessages];
      }
      if (user2Messages && user2Messages?.length > 0) {
        newMessages = [...newMessages, ...user2Messages];
      }
      setMessages(newMessages.toSorted((x, y) => +x.createdAt - +y.createdAt));
    }, [currentUserMessages, user2Messages]);

    return (
      <div className="max-h-full h-full max-w-[800px] w-full flex flex-col rounded gap-3">
        <div className="max-h-[90%] h-full border rounded p-2 overflow-auto">
          {messages.length > 0 ? (
            messages.map((message) => {
              return (
                <ChatMessage
                  message={message}
                  user={getUser(message)}
                  key={message.id}
                  isCurrentUser={getUser(message).id === currentUser.id}
                />
              );
            })
          ) : (
            <div>Начните общение!</div>
          )}
        </div>
        <div className="h-[10%] w-full flex justify-end items-center gap-2">
          <Input
            value={newMessageContent}
            onChange={(e) => newMessageInputHandler(e.target.value)}
            placeholder="Введите текст..."
          />
          <Button onClick={sendMessage}>Отправить сообщение</Button>
        </div>
      </div>
    );
  }
);
