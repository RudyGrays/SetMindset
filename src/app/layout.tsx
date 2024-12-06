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
        <Suspense
          fallback={
            <div className="h-[100vh] w-[100vw] flex items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <AppProvider>
            <AppSidebar />
            <div className="w-full h-full">
              <div className="flex">
                <Header />
              </div>

              <Container>
                <main className="h-full px-2 py-2 flex justify-center">
                  {children}
                </main>
              </Container>
            </div>
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
