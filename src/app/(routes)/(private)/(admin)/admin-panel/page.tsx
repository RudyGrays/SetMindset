import { AdminMiddleware } from "@/features/Admin/model/middleware/AdminMiddleware";
import { AdminPanel } from "@/features/Admin/ui/admin-panel";

const page = () => {
  return (
    <AdminMiddleware>
      <AdminPanel />
    </AdminMiddleware>
  );
};

export default page;
