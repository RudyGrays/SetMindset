"use client";

import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { CalendarPlus2, ChevronLeft, ChevronRight } from "lucide-react";

export const AddLessonButton = ({
  onClick,
}: {
  onClick?: (...args: any) => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-[70px]" onClick={onClick} variant={"outline"}>
            <ChevronLeft />
            <CalendarPlus2 />
            <ChevronRight />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add lesson</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
