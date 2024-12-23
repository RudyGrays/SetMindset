"use client";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import { useSidebar } from "@/shared/ui/sidebar";
import { BackButton } from "@/widgets/BackButton/ui/back-button";
import DynamicBreadcrumb from "@/widgets/DynamicBreadcrumb/ui/DynamicBreadcrumb";
import { Notifications } from "@/features/Notifications/ui/notifications";

import { useSession } from "next-auth/react";

import { FC, ReactNode } from "react";

interface HeaderProps {
  logo?: ReactNode;
}

export const HeaderDesktop: FC<HeaderProps> = () => {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();
  const session = useSession();
  return (
    <header className="w-full h-header border rounded  flex items-center px-4">
      <div className="flex w-full  border-border items-center gap-2 ">
        <BackButton />
        {session.status === "authenticated" && <DynamicBreadcrumb />}
      </div>
      <Notifications />
    </header>
  );
};
