"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { Subject } from "@prisma/client";

export const createSubject = async (
  name: string,
  userId: string
): Promise<Subject | void> => {
  const prevSub = await dbClient.subject.findFirst({
    where: {
      name: name.toLowerCase(),
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (prevSub) return prevSub;
  if (!userId) return console.log("не передал userId", userId);

  const uniqueSubject = await dbClient.subject.findFirst({
    where: {
      name: name.toLowerCase(),
    },
  });

  if (uniqueSubject) {
    return dbClient.subject.update({
      where: {
        name: name.toLowerCase(),
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  return dbClient.subject.create({
    data: {
      name: name.toLowerCase(),
      users: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

// Получение всех предметов
export const getAllSubjects = async (): Promise<Subject[]> => {
  return dbClient.subject.findMany();
};

// Получение предмета по ID
export const getSubjectById = async (
  subjectId: number
): Promise<Subject | null> => {
  return dbClient.subject.findUnique({
    where: {
      id: subjectId,
    },
  });
};

// Получение всех предметов пользователя
export const getSubjectsByUserId = async (
  userId: string
): Promise<Subject[]> => {
  return dbClient.subject.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
};

// Обновление названия предмета
export const updateSubject = async (
  subjectId: number,
  newName: string
): Promise<Subject> => {
  return dbClient.subject.update({
    where: {
      id: subjectId,
    },
    data: {
      name: newName,
    },
  });
};

export const getSubjectsWithLesson = async (userId: string) => {
  const subjects = await dbClient.subject.findMany({
    where: {
      OR: [
        {
          lessons: {
            some: {
              teacherId: userId,
            },
          },
        },
        {
          lessons: {
            some: {
              studentId: userId,
            },
          },
        },
      ],
    },
    include: {
      lessons: true,
    },
  });

  return subjects;
};

// Удаление предмета
export const deleteSubject = async (subjectId: number): Promise<Subject> => {
  return dbClient.subject.delete({
    where: {
      id: subjectId,
    },
  });
};
