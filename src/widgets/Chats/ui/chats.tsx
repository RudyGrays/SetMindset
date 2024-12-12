"use client";
import { useChat } from "@/features/Chat/model/hooks/use-chat";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/ui/context-menu";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Chat } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export const Chats = () => {
  const session = useSession();
  const myId = session.data?.user.id;
  const { chats } = useChat(myId!);
  console.log(chats);
  const router = useRouter();

  const visibleUser = (chat: any) => {
    return chat.user1Id !== myId ? chat.user1 : chat.user2;
  };

  return (
    <ScrollArea className="max-h-full ">
      <Table>
        <TableCaption>A list of your chats</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Last message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chats?.map((chat) => {
            console.log(chat.messages);
            return (
              <TableRow
                key={chat.id}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  const target = e.target as HTMLElement;
                  if (target.id === "dadad")
                    router.push(`profile/${chat.user2Id}`);
                  if (target.id !== "dadad") {
                    return router.push(`chats/${chat.id}`);
                  }
                }}
              >
                <TableCell>
                  <AppAvatar
                    image={visibleUser(chat).image!}
                    username={visibleUser(chat).name!}
                  />
                </TableCell>
                <TableCell className="text-sm ">
                  {visibleUser(chat).name}
                </TableCell>
                <TableCell className="font-medium">
                  {chat.messages[chat.messages.length - 1]?.senderId === myId
                    ? "You: "
                    : chat.messages[chat.messages.length - 1]?.senderId ===
                      chat.user2Id
                    ? chat.user2.name + ": "
                    : ""}
                  {chat.messages[chat.messages.length - 1]?.content
                    ? `${
                        chat.messages[chat.messages.length - 1]?.content
                          .split("")
                          .slice(0, 10)
                          .join("") + "..."
                      }`
                    : "-"}
                </TableCell>
                <TableCell className="font-medium">
                  {chat.messages[
                    chat.messages.length - 1
                  ]?.createdAt.toLocaleString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};