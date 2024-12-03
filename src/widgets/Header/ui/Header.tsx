"use client";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { FC } from "react";
import { HeaderMobile } from "./Header.mobile";
import { HeaderDesktop } from "./Header.desktop";

const Header = () => {
  const isMobile = useIsMobile();

  if (isMobile) return <HeaderMobile />;

  return <HeaderDesktop />;
};

export { Header };
