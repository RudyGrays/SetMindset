"use client";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import logo from "@/shared/images/Logo.webp";
import { Button } from "@/shared/ui/button";
import { useSidebar } from "@/shared/ui/sidebar";
import { Menu } from "lucide-react";
import Image from "next/image";
import { FC, ReactNode } from "react";

interface HeaderProps {
  logo?: ReactNode;
}

export const HeaderDesktop: FC<HeaderProps> = () => {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  return (
    <header className="w-full h-header   flex items-center px-4">
      <div className="flex w-full  border-border items-center gap-5 justify-between"></div>
      {isMobile && (
        <Button variant={"ghost"} onClick={() => setOpenMobile(true)}>
          <Menu />
        </Button>
      )}
    </header>
  );
};
