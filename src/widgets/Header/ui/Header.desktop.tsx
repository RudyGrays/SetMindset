"use client";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import logo from "@/shared/images/Logo.webp";
import { AppLogo } from "@/shared/ui/app-logo";
import { Button } from "@/shared/ui/button";
import { useSidebar } from "@/shared/ui/sidebar";
import { BackButton } from "@/widgets/BackButton/ui/back-button";
import DynamicBreadcrumb from "@/widgets/DynamicBreadcrumb/ui/DynamicBreadcrumb";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
      {isMobile && (
        <Button variant={"ghost"} onClick={() => setOpenMobile(true)}>
          <Menu />
        </Button>
      )}
    </header>
  );
};
