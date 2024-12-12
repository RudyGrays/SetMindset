import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { EditableProfileCard } from "@/features/Profile/ui/editable-profile-card";
import { ProfileCard } from "@/features/Profile/ui/profile-card";

const Page = async () => {
  const session = await getAppSessionServer();
  return (
    <div className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Последний шаг</h3>
        <p className="text-sm text-muted-foreground">
          Обновите профиль, это как другие пользователи увидят вас на сайте
        </p>
      </div>

      <EditableProfileCard user={session?.user!} isNew={true} />
    </div>
  );
};

export default Page;
