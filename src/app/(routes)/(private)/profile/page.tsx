import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { EditableProfileCard } from "@/features/Profile/ui/editable-profile-card";
import { Button } from "@/shared/ui/button";
import { CopyButton } from "@/widgets/CopyButton/ui/CopyButton";

const Page = async () => {
  const session = await getAppSessionServer();
  console.log(session);
  return (
    <div className="space-y-6 py-14 container  max-w-[600px] relative">
      <EditableProfileCard user={session?.user!} />

      <CopyButton data={session?.user.id!}>Поделиться профилем</CopyButton>
    </div>
  );
};

export default Page;
