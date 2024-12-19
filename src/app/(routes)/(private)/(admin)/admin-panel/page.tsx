import { AdminMiddleware } from "@/features/Admin/model/middleware/AdminMiddleware";
import { AdminPanel } from "@/features/Admin/ui/admin-panel";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin panel",
};
const page = () => {
  return (
    <AdminMiddleware>
      <AdminPanel />
    </AdminMiddleware>
  );
};

export default page;
