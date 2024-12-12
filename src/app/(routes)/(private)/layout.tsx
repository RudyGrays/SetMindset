import { AdminMiddleware } from "@/features/Admin/model/middleware/AdminMiddleware";
import { AuthMiddleware } from "@/features/Auth/model/middleware/auth.middleware";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <AuthMiddleware>{children}</AuthMiddleware>;
};

export default layout;
