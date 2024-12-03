"use client";
import { ThemeProvider } from "@/features/Theme/ui/ThemeProvider";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={"system"}
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
