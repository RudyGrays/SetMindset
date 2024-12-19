import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { LessonsContainer } from "@/widgets/LessonsContainer/ui/lessons-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lessons",
};
const Page = async () => {
  const session = await getAppSessionServer();
  if (!session) return;

  return (
    <div className="h-[calc(100vh-60px-8px)] max-w-full w-full rounded">
      <LessonsContainer user={session?.user} />
    </div>
  );
};

export default Page;
