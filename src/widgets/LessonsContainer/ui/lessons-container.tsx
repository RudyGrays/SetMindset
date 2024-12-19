"use client";

import { UserEntity } from "@/entities/User/model/types/User";

import { useIsMobile } from "@/shared/hooks/use-mobile";

import { AddLessonBlock } from "./add-lesson-block";
import { LessonsListBlock } from "./lessons-list-block";
import { useCustomSize } from "@/shared/hooks/use-custom-size";

export const LessonsContainer = ({ user }: { user: UserEntity }) => {
  const isMobile = useIsMobile();
  const isLess = useCustomSize(1400);

  return (
    <div
      className={
        "w-full h-full flex rounded  p-1 " + ` ${isLess ? " flex-col" : ""}`
      }
    >
      <AddLessonBlock user={user} />

      <LessonsListBlock user={user} isMobile={isMobile} />
    </div>
  );
};
