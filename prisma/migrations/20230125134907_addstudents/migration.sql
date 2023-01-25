/*
  Warnings:

  - You are about to drop the column `year` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "year",
ADD COLUMN     "studentgroupId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studentgroupId_fkey" FOREIGN KEY ("studentgroupId") REFERENCES "studentgroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
