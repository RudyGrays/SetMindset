import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { UserRepository } from "@/features/Auth/model/repositories/user-repository";
import { dbClient } from "@/shared/db/prisma.client";
import { FriendsList } from "@/widgets/FriendsList/ui/friends-list";
import { UsersContainer } from "@/widgets/UsersContainer/ui/users-container";

import UsersList from "@/widgets/UsersList/ui/users-list";

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
