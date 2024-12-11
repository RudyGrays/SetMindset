import { ChatGuardComponent } from "@/features/Chat/ui/chat-guard-component";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;

  return (
    <div className="flex h-full justify-center items-center overflow-hidden p-3">
      <ChatGuardComponent chatId={chatId} />
    </div>
  );
};

export default page;
