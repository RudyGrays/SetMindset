/*
  Warnings:

  - You are about to drop the column `fileContent` on the `Document` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fileContent",
ADD COLUMN     "filePath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "canTeach" BOOLEAN NOT NULL DEFAULT false;
