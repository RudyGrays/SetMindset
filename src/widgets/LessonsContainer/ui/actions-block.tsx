"use client";

import { ReactNode } from "react";

export const ActionsBlock = ({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: ReactNode;
}) => {
  return (
    <div className={`${isMobile ? "w-full" : "  "}  p-2 flex-grow  max-h-full`}>
      {children}
    </div>
  );
};
