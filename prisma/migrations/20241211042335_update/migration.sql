/*
  Warnings:

  - Made the column `senderId` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_senderId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "senderId" SET NOT NULL,
ALTER COLUMN "senderId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
