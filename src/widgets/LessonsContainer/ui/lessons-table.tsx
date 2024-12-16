"use client";

import { removeLesson } from "@/features/Lesson/model/actions/removeLesson";
import { LessonsWithFilter } from "@/features/Lesson/model/repo/repo";
import { useToast } from "@/shared/hooks/use-toast";
import { formatDate } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { AppAvatar } from "@/widgets/AppAvatar/ui/app-avatar";
import { Lesson } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

export const LessonsTable = ({ lessons }: { lessons: LessonsWithFilter[] }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return (
    <div className="max-h-[100%]    rounded-xl ">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Предмет</TableHead>
            <TableHead>Учитель</TableHead>
            <TableHead>Ученик</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Действие</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons?.map((lesson) => {
            return (
              <TableRow
                onClick={() => {}}
                className=" cursor-pointer"
                key={lesson.id}
              >
                <TableCell>{lesson.subject.name}</TableCell>
                <TableCell>{lesson.teacher.name}</TableCell>
                <TableCell>{lesson.student.name}</TableCell>
                <TableCell>{lesson.price}$</TableCell>
                <TableCell>{formatDate(lesson.date)}</TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      await removeLesson(lesson.id);
                      queryClient.refetchQueries({
                        queryKey: ["lessons"],
                      });
                      toast({
                        title: "Успешно удалено!",
                      });
                    }}
                    className="w-[70px]"
                    variant={"outline"}
                  >
                    <X />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
