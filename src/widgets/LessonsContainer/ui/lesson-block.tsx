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
    <div className={"flex  p-3  " + `${isMobile ? " " : " "} ${className}`}>
      {children}
    </div>
  );
};
