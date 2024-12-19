import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AppSidebar } from "@/widgets/AppSidebar/ui/AppSidebar";

import { AppProvider } from "@/widgets/AppProvider/Provider";

import { Container } from "@/shared/ui/app-container";

import { Header } from "@/widgets/Header/ui/Header";

import { Toaster } from "@/shared/ui/toaster";
import { CallNotification } from "@/widgets/CallNotification/ui/CallNotification";

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
          <div className="flex w-full">
            <div className="flex-shrink">
              <AppSidebar />
            </div>
            <div className="w-full min-h-full flex flex-col flex-grow">
              <div className="flex pt-2 px-2 ">
                <Header />
              </div>
              <Container>
                <main className=" px-2 py-2 h-[calc(100vh-60px-8px)]  flex w-full">
                  <div className="h-full w-full  rounded overflow-hidden">
                    {children}
                  </div>
                </main>
              </Container>
            </div>
          </div>
          <CallNotification />
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
