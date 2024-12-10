"use client";
import { SocketProvider } from "@/features/Socket/ui/socket-provider";
import { ThemeProvider } from "@/features/Theme/ui/ThemeProvider";
import { queryClient } from "@/shared/api/query-client";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SocketProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider className="h-full">{children}</SidebarProvider>
          </ThemeProvider>
        </SocketProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
