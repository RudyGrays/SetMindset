import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { LessonsContainer } from "@/widgets/LessonsContainer/ui/lessons-container";

const Page = async () => {
  const session = await getAppSessionServer();
  if (!session) return;

  return (
    <div className="h-full max-h-full max-w-full w-full rounded">
      <LessonsContainer user={session?.user} />
    </div>
  );
};

export default Page;
