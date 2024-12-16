"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { Lesson, Prisma } from "@prisma/client";
import { lte } from "lodash-es";
import { DateRange } from "react-day-picker";

export const getTeachFriends = async (userId: string) => {
  return await dbClient.user.findMany({
    where: {
      id: { not: userId },
      canTeach: true,
      friends: {
        some: {
          userId: userId,
          status: "ACCEPTED",
        },
      },
    },
  });
};

export const getTeacherFriends = async (userId: string) => {
  return await dbClient.lesson.findMany({
    where: {
      studentId: userId,
    },
    select: {
      teacher: true,
    },
  });
};

export const getStudentFriends = async (userId: string) => {
  return await dbClient.lesson.findMany({
    where: {
      teacherId: userId,
    },
    select: {
      student: true,
    },
  });
};

export const assignLesson = async ({
  teacherId,
  studentId,
  date,
  price,
  subjectId,
}: {
  teacherId: string;
  studentId: string;
  date: Date;
  price: number;
  subjectId: number;
}) => {
  return await dbClient.lesson.create({
    data: {
      teacherId,
      studentId,
      date,
      price,
      subjectId,
    },
  });
};

export const deleteLesson = async (lessonId: string) => {
  return dbClient.lesson.delete({
    where: {
      id: lessonId,
    },
  });
};

export const getAllLessons = async () => {
  return await dbClient.lesson.findMany({
    include: {
      teacher: true,
      student: true,

      subject: true,
    },
  });
};

export const getLessonsByDate = async (direction: "asc" | "desc" = "asc") => {
  return await dbClient.lesson.findMany({
    orderBy: {
      date: direction === "asc" ? "asc" : "desc",
    },
    include: {
      teacher: true,
      student: true,
      subject: true,
    },
  });
};

export const getLessonsByTeacherName = async (teacherName: string) => {
  return await dbClient.lesson.findMany({
    where: {
      teacher: {
        name: { contains: teacherName, mode: "insensitive" }, // Фильтрация по имени учителя (не чувствительно к регистру)
      },
    },
    include: {
      teacher: true,
      student: true,
      subject: true,
    },
  });
};

export const getLessonsBySubjectName = async (subjectName: string) => {
  return dbClient.lesson.findMany({
    where: {
      subject: {
        name: { contains: subjectName, mode: "insensitive" },
      },
    },
    include: {
      teacher: true,
      student: true,
      subject: true,
    },
  });
};

export const getLessonsWithFilters = async ({
  teacherName,
  subjectId,
  dateRange,
  direction = "asc",
  price,
}: {
  teacherName?: string;
  subjectId?: number;
  dateRange?: DateRange;
  direction?: "asc" | "desc";
  price?: number;
}) => {
  const filters: any = {};

  if (teacherName) {
    filters.OR = [
      {
        student: {
          name: { contains: teacherName, mode: "insensitive" },
        },
      },
      {
        teacher: {
          name: { contains: teacherName, mode: "insensitive" },
        },
      },
    ];
  }

  if (subjectId) {
    filters.subject = {
      id: subjectId,
    };
  }

  if (dateRange) {
    filters.date = {
      gte: dateRange.from,
      lte: dateRange.to,
    };
  }

  const lessons = await dbClient.lesson.findMany({
    where: filters,
    orderBy: {
      date: direction,
    },
    include: {
      teacher: true,
      student: true,
      subject: true,
    },
  });

  return lessons;
};

export type LessonsWithFilter = Prisma.LessonGetPayload<{
  include: { teacher: true; student: true; subject: true };
}>;
