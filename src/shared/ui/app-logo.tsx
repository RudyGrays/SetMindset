"use client";
import Image from "next/image";
import logo from "@/shared/images/Logo.webp";
import Link from "next/link";
import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";
import { useEffect } from "react";
export const AppLogo = () => {
  const isMobile = useIsMobile();
  const desktopSize = 140;
  const mobileSize = 70;
  return (
    <div
      className={cn(
        ` max-h-[${desktopSize}px] max-w-[${desktopSize}px] h-[${desktopSize}px] w-[${desktopSize}px]  px-2`
      )}
    >
      <Link href={"/"}>
        <img
          width={isMobile ? mobileSize : desktopSize}
          height={isMobile ? mobileSize : desktopSize}
          className={cn(
            `rounded-br-[20%] rounded-bl-[20%] min-w-[${desktopSize}px] min-h-[${desktopSize}px]`,
            { isMobile }
          )}
          src={logo.src}
          alt="ошибка загрузки"
        />
      </Link>
    </div>
  );
};
