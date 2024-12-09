"use client";

import { ReactNode } from "react";
import { SocketContextProvider } from "./socket-context";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return <SocketContextProvider>{children}</SocketContextProvider>;
};
