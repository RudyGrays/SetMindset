"use client";

import { UserEntity } from "@/entities/User/model/types/User";
import { useGetSubjectFiles } from "@/features/AddSubjectWithFile/model/hooks/use-get-user-subjectsFiles";
import { useFriends } from "@/features/Friends/model/hooks/use-friends";
import { useCreateLesson } from "@/features/Lesson/model/hooks/useCreateLesson";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useToast } from "@/shared/hooks/use-toast";
import { useCallback, useState } from "react";
import { LessonBlock } from "./lesson-block";
import { ActionsBlock } from "./actions-block";
import { TimeBlock } from "./time-block";
import { DollarSign, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { AddLessonButton } from "./add-lesson-button";
import { LessonUsersTable } from "@/widgets/LessonUsersTable/ui/lesson-users-table";
import { Input } from "@/shared/ui/input";
import { SelectSubject } from "./select-subject";
import Link from "next/link";
import { Spinner } from "@/shared/ui/spinner";
import { useCustomSize } from "@/shared/hooks/use-custom-size";

export const AddLessonBlock = ({ user }: { user: UserEntity }) => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>();
  const [teacher, setTeacher] = useState<UserEntity>();
  const [student, setStudent] = useState<UserEntity>();
  const [subjectId, setSubjectId] = useState<number>();
  const [price, setPrice] = useState<number | string>("");
  const { SubjectsAndFiles, isPending } = useGetSubjectFiles(user.id!);
  const { toast } = useToast();
  const { friends } = useFriends(user.id!);
  const { createLessonMutate } = useCreateLesson();

  const handleSubjectChange = (subjectId: string) => {
    setSubjectId(+subjectId);
    console.log(subjectId);
  };

  const handleStudentChange = useCallback(
    (student: UserEntity) => {
      setStudent(student);
      console.log(student);
    },
    [setStudent]
  );

  const handleDateChange = useCallback(
    (newDate?: Date) => {
      setDate(newDate);
    },
    [setDate]
  );

  const isLess = useCustomSize(1000);

  const handleCreateLesson = async () => {
    const errors = [];
    if (!date) {
      errors.push("Выбери дату!");
    }
    if (!price || price === "" || price === "0") {
      errors.push("Укажи цену за урок!");
    }
    if (!student) {
      errors.push("Выбери ученика!");
    }
    if (!subjectId) {
      errors.push("Выбери предмет!");
    }

    if (errors.length > 0 || !date)
      return toast({
        className: "w-max",
        description: (
          <div className="flex flex-col gap-2">
            {errors.map((error) => {
              return (
                <div
                  className="text-red-500 border rounded-xl p-2 text-sm w-max"
                  key={error}
                >
                  {error}
                </div>
              );
            })}
          </div>
        ),
      });

    createLessonMutate({
      date: date,
      price: +price,
      studentId: student?.id!,
      subjectId: +subjectId!,
      teacherId: user.id!,
    });
    setDate(undefined);
    setPrice("0");
    setStudent(undefined);
    setSubjectId(undefined);
  };

  return (
    <LessonBlock
      className={`${
        isLess ? "max-h-[50%] w-full" : "flex-grow"
      } overflow-auto custom-scrollbar`}
      isMobile={isMobile}
    >
      <div className="flex flex-col w-full ">
        <div className="flex w-full  ">
          <ActionsBlock isMobile={isMobile}>
            <TimeBlock
              date={date}
              handleDateChange={handleDateChange}
              isMobile={isMobile}
              setDate={setDate}
            />
          </ActionsBlock>
          <div className="h-full flex-col gap-2  flex items-center justify-center">
            <Button
              onClick={() => {
                setDate(undefined);
                setPrice("0");
                setStudent(undefined);
                setSubjectId(undefined);
              }}
              className="w-[70px]"
              variant={"outline"}
            >
              <X />
            </Button>
            <AddLessonButton onClick={handleCreateLesson} />
          </div>
          <ActionsBlock isMobile={isMobile}>
            <div className="w-full h-full flex justify-center">
              <div
                className={
                  "max-w-[300px] max-h-full border h-full rounded-xl flex flex-col p-2 items-center gap-1 overflow-auto custom-scrollbar"
                }
              >
                <div className="flex-grow w-full">
                  {friends ? (
                    <LessonUsersTable
                      onClick={handleStudentChange}
                      users={friends}
                      currentUser={student}
                    />
                  ) : (
                    <div className="w-full text-center">
                      <Spinner />
                    </div>
                  )}
                </div>
                {SubjectsAndFiles?.canTeach && (
                  <div className="w-full relative">
                    <Input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Цена"
                    />
                    <DollarSign className="absolute top-2 right-1 w-4 h-4" />
                  </div>
                )}
                <div className="w-full">
                  {SubjectsAndFiles?.canTeach ? (
                    <SelectSubject
                      handleChangeSubject={handleSubjectChange}
                      items={SubjectsAndFiles.subjects}
                      currentSubjectId={String(subjectId)}
                    />
                  ) : (
                    <Link href={`/profile`} className="w-full">
                      <Button variant={"outline"} className="w-full">
                        Добавить предмет
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </ActionsBlock>
        </div>
      </div>
    </LessonBlock>
  );
};
