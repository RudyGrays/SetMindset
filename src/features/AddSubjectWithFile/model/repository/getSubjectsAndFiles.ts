"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const getSubjectsWithFilesForUser = async (userId: string) => {
  return await dbClient.user.findUnique({
    where: { id: userId },
    include: {
      subjects: {
        include: {
          documents: {
            where: {
              userId: userId,
            },
            select: {
              id: true,
              filename: true,
              filePath: true,
              isOk: true,
            },
          },
        },
      },
    },
  });
};

// {
//   "id": "user1",
//   "name": "Alice",
//   "subjects": [
//     {
//       "id": 1,
//       "name": "Mathematics",
//       "documents": [
//         {
//           "id": 1,
//           "filename": "math_notes.pdf",
//           "fileContent": "<Binary Content>"
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "name": "Physics",
//       "documents": [
//         {
//           "id": 2,
//           "filename": "physics_notes.pdf",
//           "fileContent": "<Binary Content>"
//         }
//       ]
//     }
//   ]
// }
