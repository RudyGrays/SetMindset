"use client";
import { ModeToggle } from "@/features/Theme/ui/ToggleTheme";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/shared/ui/sidebar";
import { NavUser } from "@/widgets/AppSidebar/ui/NavProfile/ui/NavProfile";

import { useSession } from "next-auth/react";

import { FC } from "react";
import { getSidebarItems } from "../model/config/sidebarItemsData";

import Link from "next/link";
import { Logo } from "@/shared/ui/app-logo";

interface AppSidebarProps {
  someClasses?: string;
}

const AppSidebar: FC<AppSidebarProps> = ({ someClasses, ...props }) => {
  const isMobile = useIsMobile();
  const session = useSession();
  const { setOpen, setOpenMobile, open } = useSidebar();

  const closeSidebarHandler = () => {
    setOpenMobile(false);
  };
  const sessionData = session.data;
  const isAuth = !!sessionData;
  const tryAuth = session.status === "loading";

  const items = getSidebarItems(
    isAuth,
    tryAuth,
    session.data?.user.role === "ADMIN"
  );
  return (
    <div className="relative">
      <Sidebar collapsible="icon">
        <SidebarContent className="">
          <SidebarGroup className="">
            {open && (
              <Link href={"/"}>
                <SidebarGroupLabel className="cursor-pointer mb-[15%] h-header flex gap-2 items-center">
                  <Logo />
                  <span className="text-xl flex gap-1 relative overflow-hidden">
                    <span>
                      <span className="text-primary ">S</span>et
                    </span>

                    <span>
                      <span className="text-primary">M</span>indset
                    </span>
                  </span>
                </SidebarGroupLabel>
              </Link>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {!open && (
                  <Link href={"/"}>
                    <SidebarMenuItem className="flex justify-center h-header items-center">
                      <Logo />
                    </SidebarMenuItem>
                  </Link>
                )}
                {items.map((item) => (
                  <SidebarMenuItem key={item?.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} onClick={closeSidebarHandler}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {isAuth && <NavUser user={sessionData?.user} />}
          <div className="flex justify-center">
            <ModeToggle />
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {!isMobile && (
        <SidebarTrigger className="absolute bottom-[30px] z-50 right-[-50px]  bg-transparent" />
      )}
    </div>
  );
};

export { AppSidebar };
