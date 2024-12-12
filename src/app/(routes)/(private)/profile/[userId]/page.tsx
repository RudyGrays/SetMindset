import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { EditableProfileCard } from "@/features/Profile/ui/editable-profile-card";
import { ProfileCard } from "@/features/Profile/ui/profile-card";

import { dbClient } from "@/shared/db/prisma.client";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const session = await getAppSessionServer();
  const { userId } = await params;

  if (!userId) return <div>Пользователь не найден!</div>;

  let user;
  try {
    user = await dbClient.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return <div>Пользователь не найден!</div>;
    }
  } catch (e) {
    console.error("Пользователь с таким id не найден:", e);
    return <div>Ошибка получения профиля</div>;
  }
  if (session?.user.id === userId) return redirect("/profile");
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <div className="space-y-6 py-14 container  max-w-[600px]">
      {isAdmin ? (
        <EditableProfileCard user={user} />
      ) : (
        <ProfileCard user={user} />
      )}
    </div>
  );
};

export default Page;
