"use client";
import Image from "next/image";
import logo from "@/shared/images/Logo.webp";
import Link from "next/link";
import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";

export const AppLogo = () => {
  const isMobile = useIsMobile();

  const size = isMobile ? 70 : 100;

  return (
    <div
      className={cn("max-h-[140px]  flex justify-center items-center px-2 ")}
    >
      <Link href={"/"}>
        <Image
          width={size}
          height={size}
          className="rounded-br-[20%] rounded-bl-[20%] object-contain"
          src={logo}
          alt="Логотип"
          priority={true}
        />
      </Link>
    </div>
  );
};
