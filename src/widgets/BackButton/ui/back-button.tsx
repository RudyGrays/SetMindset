"use client";

import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleBack} variant={"ghost"}>
      <ArrowLeft />
    </Button>
  );
};
