import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { dbClient } from "@/shared/db/prisma.client";
import { FriendsList } from "@/widgets/FriendsList/ui/friends-list";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Friends",
};
const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const session = await getAppSessionServer();
  let currentUser = session?.user;
  const { userId } = await params;
  if (userId) {
    const user = await dbClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      currentUser = user;
    }
  }

  return (
    <div className="flex flex-col h-full  w-full p-2">
      <FriendsList user={currentUser!} />
    </div>
  );
};

export default Page;
