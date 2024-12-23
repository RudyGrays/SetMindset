"use client";

import { useCustomSize } from "@/shared/hooks/use-custom-size";
import { GuideCarousel } from "./guide-carousel";
import { GuidesConf } from "../model/config/guides-conf";

export const GuideContainer = () => {
  const isLess = useCustomSize(800);

  return (
    <div
      className={
        "h-full flex items-center justify-center flex-col overflow-auto custom-scrollbar " +
        `${isLess ? " w-full " : " w-1/2 "}`
      }
    >
      <h1 className="text-2xl">Guide</h1>
      <GuideCarousel guides={GuidesConf} />
    </div>
  );
};
