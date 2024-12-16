import { AdminMiddleware } from "@/features/Admin/model/middleware/AdminMiddleware";

const page = () => {
  return (
    <AdminMiddleware>
      <div className="flex w-full h-full items-center justify-center">
        В разработке...
      </div>
    </AdminMiddleware>
  );
};

export default page;
