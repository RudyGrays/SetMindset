"use client";
import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1400px] h-full w-full mx-auto">{children}</div>;
};
