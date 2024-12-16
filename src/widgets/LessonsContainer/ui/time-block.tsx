"use client";

import { useCustomSize } from "@/shared/hooks/use-custom-size";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { DateTimePicker } from "@/widgets/TimePicker/time-picker";
import { TimePickerDemo } from "@/widgets/TimePicker/time-picker-demo";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const TimeBlock = ({
  isMobile,
  date,
  handleDateChange,
  setDate,
}: {
  isMobile: boolean;
  date: Date | undefined;
  handleDateChange: (newDate?: Date) => void;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const isless = useCustomSize(1200);
  return (
    <div className="w-full h-full flex justify-center">
      <div
        className={
          "max-w-[300px] max-h-full h-full  rounded-xl flex flex-col p-2 items-center gap-1 overflow-auto custom-scrollbar" +
          `${!isless && " border"}`
        }
      >
        {!isless ? (
          <>
            <Button
              variant={"ghost"}
              className={cn(
                "w-full justify-center text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
            </Button>
            <Calendar
              onSelect={handleDateChange}
              mode="single"
              selected={date}
              className="flex h-max w-max border-b justify-center"
            />
            <TimePickerDemo handleDateChange={handleDateChange} date={date} />
          </>
        ) : (
          <div className="">
            <DateTimePicker handleDateChange={handleDateChange} date={date} />
          </div>
        )}
      </div>
    </div>
  );
};
