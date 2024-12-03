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
} from "@/shared/ui/sidebar";
import { NavUser } from "@/widgets/AppSidebar/ui/NavProfile/ui/NavProfile";

import { useSession } from "next-auth/react";

import { FC } from "react";
import { getSidebarItems } from "../model/config/sidebarItemsData";

import Link from "next/link";

interface AppSidebarProps {
  someClasses?: string;
}

const AppSidebar: FC<AppSidebarProps> = ({ someClasses, ...props }) => {
  const isMobile = useIsMobile();
  const { data: sessionData } = useSession();
  const isAuth = !!sessionData;
  const items = getSidebarItems(isAuth);
  return (
    <div className="relative">
      <Sidebar collapsible="icon">
        <SidebarContent className="">
          <SidebarGroup className="mt-[15%]">
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
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
