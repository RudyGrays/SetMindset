import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/widgets/AppSidebar/ui/AppSidebar";

import { AppProvider } from "@/widgets/AppProvider/Provider";
import { ThemeProvider } from "@/features/Theme/ui/ThemeProvider";
import { Container } from "@/shared/ui/app-container";
import { Breadcrumb } from "@/shared/ui/breadcrumb";
import { AppBreadcrumb } from "@/widgets/AppBreadcrumb/ui/AppBreadcrumb";
import { Header } from "@/widgets/Header/ui/Header";
import Image from "next/image";
import { AppLogo } from "@/shared/ui/app-logo";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui/spinner";
import { AuthMiddleware } from "@/features/Auth/model/middleware/auth.middleware";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SetMindset",
  description: "Web App for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <AppProvider>
          <AppSidebar />
          <div className="w-full min-h-full flex flex-col">
            <div className="flex pt-2 px-2 ">
              <Header />
            </div>

            <Container>
              <main className=" px-2 py-2 h-[calc(100vh-60px-8px)]  flex w-full">
                <div className="h-full w-full border rounded overflow-hidden">
                  {children}
                </div>
              </main>
            </Container>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
