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

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    const newMessageInputHandler = (value: string) => {
      setNewMessage(value);
    };

    useEffect(() => {
      socket?.emit("joinChat", chatId, currentUser.id);
    }, [socket, chatId]);

    const { mutation } = useSendMessage();

    const sendMessage = async () => {
      if (newMessageContent.length === 0) return;
      const newMessage: Message = {
        id: parseInt(nanoid(10), 36) + Date.now(),
        chatId: +chatId,
        content: newMessageContent,
        createdAt: new Date(),
        senderId: currentUser.id!,
      };
      setMessages((prev) => [...prev, newMessage]);

      socket?.emit("sendMessage", chatId, newMessage);

      mutation.mutate(newMessage);
      setNewMessage("");
    };

    useEffect(() => {
      socket?.on("receiveMessage", (message: Message) => {
        console.log("receive");
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
        <ScrollArea className="max-h-[90%] border h-full  rounded p-2 ">
          {messages.length > 0 ? (
            messages.map((message, id, arr) => {
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
            <div className="flex min-h-full  w-full items-center justify-center">
              Начните общение!
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
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
