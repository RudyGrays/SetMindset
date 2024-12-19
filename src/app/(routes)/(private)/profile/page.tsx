import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { EditableProfileCard } from "@/features/Profile/ui/editable-profile-card";
import { Button } from "@/shared/ui/button";
import { CopyButton } from "@/widgets/CopyButton/ui/CopyButton";

const Page = async () => {
  const session = await getAppSessionServer();

  return (
    <div className="space-y-6 py-14 container h-[calc(100vh-60px-8px)]  max-w-[600px]">
      <EditableProfileCard user={session?.user!} />
    </div>
  );
};

export default Page;
