"use client";

import { ReactNode } from "react";

export const LessonBlock = ({
  children,
  isMobile,
  className,
}: {
  children: ReactNode;
  isMobile: boolean;
  className?: string;
}) => {
  return (
    <div
      className={
        "flex rounded p-3 border  " + `${isMobile ? " " : " "} ${className}`
      }
    >
      {children}
    </div>
  );
};
