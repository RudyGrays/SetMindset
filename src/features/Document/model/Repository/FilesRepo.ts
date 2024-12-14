"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { Document } from "@prisma/client";

export const uploadFile = async ({
  filename,
  filePath,
  userId,
  subjectId,
}: {
  filename: string;
  filePath: string;
  userId: string;
  subjectId: number;
}): Promise<Document> => {
  return dbClient.document.create({
    data: {
      filename,
      filePath,
      userId,
      subjectId,
    },
  });
};

export const getFileById = async (
  documentId: number
): Promise<Document | null> => {
  return dbClient.document.findUnique({
    where: { id: documentId },
  });
};

export const getFilesByUserId = async (userId: string): Promise<Document[]> => {
  return dbClient.document.findMany({
    where: {
      userId,
    },
  });
};

export const getFilesBySubjectId = async (
  subjectId: number
): Promise<Document[]> => {
  return dbClient.document.findMany({
    where: {
      subjectId,
    },
  });
};

export const updateFile = async (
  documentId: number,
  newFilename: string,
  newFileContent: string
): Promise<Document> => {
  return dbClient.document.update({
    where: { id: documentId },
    data: {
      filename: newFilename,
      filePath: newFileContent,
    },
  });
};

export const deleteFile = async (documentId: number): Promise<Document> => {
  return dbClient.document.delete({
    where: { id: documentId },
  });
};
