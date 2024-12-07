"use client";
import { Button } from "@/shared/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

export const CopyButton = ({
  children,
  data,
}: {
  children: ReactNode | string;

  data: any;
}) => {
  const [copy, setCopy] = useState(false);
  const copyHandler = async () => {
    setCopy(true);
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/profile/${data}`
    );
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <Button onClick={copyHandler}>
      {children}
      {copy ? <CopyCheck /> : <Copy />}
    </Button>
  );
};
