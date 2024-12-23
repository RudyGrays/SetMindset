"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { Message } from "@prisma/client";
import {
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChatMessage } from "./chat-message";
import { Button } from "@/shared/ui/button";
import { useSidebar } from "@/shared/ui/sidebar";
import { Input } from "@/shared/ui/input";
import { useSocket } from "@/features/Socket/ui/socket-context";
import { useMessages } from "../model/hooks/use-messages";
import { useSendMessage } from "../model/hooks/use-send-message";

import { nanoid } from "nanoid";
import { formatDate } from "@/shared/lib/utils";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { queryClient } from "@/shared/api/query-client";
import { useChatId } from "./chat-context";
interface ChatProps {
  currentUser: UserEntity;
  user2: UserEntity;
  currentUserMessages?: Message[];
  user2Messages?: Message[];
  chatId: string;
}
export interface MessageWithIsFirst extends Message {
  isFirst: boolean;
  isTime: boolean;
}
export const Chat: FC<ChatProps> = memo(
  ({ currentUser, user2, currentUserMessages, user2Messages, chatId }) => {
    const [localMessages, setMessages] = useState<any[]>([]);
    const [newMessageContent, setNewMessage] = useState("");
    const { socket } = useSocket();
    const { messages } = useMessages(localMessages);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { setChat } = useChatId();

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    useEffect(() => {
      setChat(chatId);

      return () => setChat(undefined);
    }, [chatId]);

    const newMessageInputHandler = (value: string) => {
      setNewMessage(value);
    };

    useEffect(() => {
      socket?.emit("joinChat", chatId, currentUser.id);
    }, [socket, chatId]);

    const { mutation } = useSendMessage();

    const sendMessage = async () => {
      if (newMessageContent.length === 0) return;
      const date = new Date();
      const newMessage: any = {
        id: parseInt(nanoid(10), 36) + Date.now(),
        chatId: +chatId,
        content: newMessageContent,
        createdAt: date.toLocaleString("ru-RU", {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "numeric",
        }),
        senderId: currentUser.id!,
        isFirst:
          messages.length > 0
            ? messages[messages.length - 1].senderId !== currentUser.id
            : true,
        isTime:
          messages.length > 0
            ? messages[messages.length - 1].createdAt.toLocaleString("ru-RU", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
              }) !==
              date.toLocaleString("ru-RU", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
              })
            : true,
      };
      setMessages((prev) => [...prev, newMessage]);

      socket?.emit("sendMessage", chatId, newMessage, user2);

      mutation.mutate(newMessage);
      setNewMessage("");
    };

    useEffect(() => {
      socket?.on("receiveMessage", (message: Message) => {
        if (message.senderId === currentUser.id) return;
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket?.off("receiveMessage");
      };
    }, [socket, chatId, messages, currentUser.id]);

    const getUser = useCallback(
      (message: Message) =>
        message.senderId === currentUser.id ? currentUser : user2,
      [currentUser, user2]
    );

    useEffect(() => {
      let newMessages: any[] = [];

      if (currentUserMessages && currentUserMessages?.length > 0) {
        newMessages = [...newMessages, ...currentUserMessages];
      }
      if (user2Messages && user2Messages?.length > 0) {
        newMessages = [...newMessages, ...user2Messages];
      }

      const sorted = newMessages
        .toSorted((x, y) => +x.createdAt - +y.createdAt)
        .reduce((acc: MessageWithIsFirst[], message: MessageWithIsFirst) => {
          let item;
          if (!acc[0]) {
            acc.push({ ...message, isFirst: true, isTime: true });
            return acc;
          }
          if (acc[acc.length - 1].senderId === message.senderId) {
            item = { ...message, isFirst: false };
          } else {
            item = { ...message, isFirst: true };
          }
          if (
            formatDate(message.createdAt) ===
            formatDate(acc[acc.length - 1].createdAt)
          ) {
            item.isTime = false;
          } else {
            item.isTime = true;
          }
          acc.push(item);
          return acc;
        }, []);
      setMessages(sorted);
    }, [currentUserMessages, user2Messages]);

    return (
      <div className="max-h-full h-full max-w-[800px] w-full flex flex-col rounded gap-3">
        <div className="max-h-[90%] border h-full w-full max-w-full  rounded p-2 overflow-auto custom-scrollbar">
          {messages.length > 0 ? (
            messages.map((message, id, arr) => {
              return (
                <ChatMessage
                  messages={localMessages}
                  message={message}
                  user={getUser(message)}
                  key={message.id}
                  isCurrentUser={getUser(message).id === currentUser.id}
                />
              );
            })
          ) : (
            <div className="flex min-h-full  w-full items-center justify-center">
              Начните общение!
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-[10%] w-full flex justify-end items-center gap-2">
          <Input
            value={newMessageContent}
            onChange={(e) => newMessageInputHandler(e.target.value)}
            placeholder="Введите текст..."
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button onClick={sendMessage}>Отправить сообщение</Button>
        </div>
      </div>
    );
  }
);
Chat.displayName = "Chat";
