"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { useGetSubjectsWithLesson } from "@/features/Subject/model/hooks/useGetSubjectsWithLesson";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

import { useCallback, useState } from "react";
import { SelectSubject } from "./select-subject";
import { SelectSubjectList } from "./select-subject-list";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { DatePickerWithRange } from "./date-range-picker";
import { useGetLessonsWithFilters } from "@/features/Lesson/model/hooks/useGetLessonsWithFilters";
import { LessonsTable } from "./lessons-table";
import { Spinner } from "@/shared/ui/spinner";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useCustomSize } from "@/shared/hooks/use-custom-size";
import { useDebounce } from "use-debounce";

export const LessonsListBlock = ({
  isMobile,
  user,
}: {
  isMobile: boolean;
  user: UserEntity;
}) => {
  const [direction, setDirection] = useState<"asc" | "desc">();
  const [name, setName] = useState<string>("");
  const [subjectId, setSubjectId] = useState<number>();
  const [date, setDate] = useState<DateRange | undefined>();

  const handleSubjectChange = (subjectId: string) => {
    setSubjectId(+subjectId);
    console.log(subjectId);
  };
  const handleDateChange = (newDate?: DateRange | undefined) => {
    setDate(newDate);
  };
  const [debouncedValue] = useDebounce(name, 500);
  const { subjects } = useGetSubjectsWithLesson(user.id!);
  const { lessons, isLoading } = useGetLessonsWithFilters({
    dateRange: date,
    direction,
    subjectId,
    teacherName: debouncedValue,
  });

  const isLess = useCustomSize(1000);
  return (
    <div
      className={"p-3  min-w-[30%] flex-grow   flex " + ` ${isLess ? "" : ""}`}
    >
      <div className="w-full max-h-full  flex flex-col ">
        <h1 className="text-center mb-1">Lessons</h1>
        <div className="border rounded-xl h-full w-full">
          <div className="flex p-2 gap-2   flex-wrap justify-between  overflow-auto custom-scrollbar">
            <Input
              className="w-[165px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />
            {subjects && (
              <SelectSubjectList
                currentSubjectId={String(subjectId)}
                handleChangeSubject={handleSubjectChange}
                items={subjects}
              />
            )}
            <DatePickerWithRange handleChange={handleDateChange} date={date} />
            <div className="flex gap-1  items-center">
              <Switch
                defaultChecked={false}
                id="direction-mode"
                onCheckedChange={(isChecked) =>
                  setDirection(isChecked ? "desc" : "asc")
                }
              />
              <Label htmlFor="direction-mode" className="w-[30px]">
                {direction}
              </Label>
            </div>
            <Button
              onClick={() => {
                setDate(undefined);

                setSubjectId(undefined);
              }}
              className="w-[70px]"
              variant={"outline"}
            >
              <X />
            </Button>
          </div>
          <div className="flex-grow-[4] overflow-auto custom-scrollbar">
            <LessonsTable isLoading={isLoading} lessons={lessons} />
          </div>
        </div>
      </div>
    </div>
  );
};
