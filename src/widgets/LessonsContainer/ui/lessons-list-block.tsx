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

  const handleSubjectChange = (subjectId: number) => {
    setSubjectId(subjectId);
    console.log(subjectId);
  };
  const handleDateChange = (newDate?: DateRange | undefined) => {
    setDate(newDate);
  };

  const { subjects } = useGetSubjectsWithLesson(user.id!);
  const { lessons, error, isLoading } = useGetLessonsWithFilters({
    dateRange: date,
    direction,
    subjectId,
    teacherName: name,
  });

  const isLess = useCustomSize(1000);
  return (
    <div
      className={
        "p-3 border min-w-[30%] flex-grow  rounded flex " +
        ` ${isLess ? "max-h-[50%]" : ""}`
      }
    >
      <div className="w-full max-h-full flex flex-col ">
        <div className="flex p-2 gap-2 flex-grow-[1]  flex-wrap justify-between overflow-auto custom-scrollbar">
          <Input
            className="w-[165px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя пользователя"
          />
          {subjects && (
            <SelectSubjectList
              currentSubjectId={String(subjectId)}
              handleChangeSubject={handleSubjectChange}
              items={subjects}
            />
          )}
          <DatePickerWithRange handleChange={handleDateChange} date={date} />
          <div className="flex items-center gap-1">
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
          {isLoading ? (
            <Spinner />
          ) : lessons ? (
            <LessonsTable lessons={lessons} />
          ) : (
            <div>Список пуст</div>
          )}
        </div>
      </div>
    </div>
  );
};
