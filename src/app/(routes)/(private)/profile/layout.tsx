import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Profile",
};
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex items-center  justify-center">{children}</div>
  );
};

export default layout;
