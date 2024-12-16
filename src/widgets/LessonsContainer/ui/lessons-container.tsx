"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { Divider } from "@/features/Auth/ui/divider";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ReactNode, useCallback, useState } from "react";
import { LessonBlock } from "./lesson-block";
import { Calendar } from "@/shared/ui/calendar";
import { Button } from "@/shared/ui/button";
import {
  CalendarIcon,
  CalendarPlus,
  CalendarPlus2,
  DollarSign,
  X,
} from "lucide-react";

import { AddLessonBlock } from "./add-lesson-block";
import { LessonsListBlock } from "./lessons-list-block";
import { useCustomSize } from "@/shared/hooks/use-custom-size";

export const LessonsContainer = ({ user }: { user: UserEntity }) => {
  const isMobile = useIsMobile();
  const isLess = useCustomSize(1400);
  return (
    <div
      className={
        "w-full h-full flex rounded gap-2 " + ` ${isLess ? " flex-col" : ""}`
      }
    >
      <AddLessonBlock user={user} />

      <LessonsListBlock user={user} isMobile={isMobile} />
    </div>
  );
};
