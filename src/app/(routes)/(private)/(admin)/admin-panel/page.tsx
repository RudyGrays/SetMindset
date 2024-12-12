import { AdminMiddleware } from "@/features/Admin/model/middleware/AdminMiddleware";

const page = () => {
  return (
    <AdminMiddleware>
      <div> admin panelsdsd</div>
    </AdminMiddleware>
  );
};

export default page;
