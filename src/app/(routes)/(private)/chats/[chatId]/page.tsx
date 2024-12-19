import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { ChatGuardComponent } from "@/features/Chat/ui/chat-guard-component";
import { dbClient } from "@/shared/db/prisma.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const session = await getAppSessionServer();
  const { chatId } = await params;
  const chat = await dbClient.chat.findUnique({
    where: {
      id: +chatId,
    },
    include: { user1: true, user2: true },
  });
  const user = chat?.user1Id === session?.user.id ? chat?.user2 : chat?.user1;
  return {
    title: `Chat - ${user?.name}`,
  };
}

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;

  return (
    <div className="flex h-full w-full  justify-center items-center p-3">
      <ChatGuardComponent chatId={chatId} />
    </div>
  );
};

export default page;
