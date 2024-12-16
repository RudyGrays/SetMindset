"use client";
import { Notifications } from "@/features/Notifications/ui/notifications";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import logo from "@/shared/images/Logo.webp";
import { Button } from "@/shared/ui/button";
import { useSidebar } from "@/shared/ui/sidebar";
import DynamicBreadcrumb from "@/widgets/DynamicBreadcrumb/ui/DynamicBreadcrumb";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, ReactNode } from "react";

interface HeaderProps {
  logo?: ReactNode;
}

export const HeaderMobile: FC<HeaderProps> = () => {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();
  const session = useSession();
  return (
    <header className="w-full h-header flex items-center px-4">
      <div className="flex w-full  border-border rounded items-center gap-2">
        {session.status === "authenticated" && <DynamicBreadcrumb />}
      </div>
      <Notifications />
      {isMobile && (
        <Button variant={"ghost"} onClick={() => setOpenMobile(true)}>
          <Menu />
        </Button>
      )}
    </header>
  );
};
