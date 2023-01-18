/*
  Warnings:

  - You are about to drop the column `school` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "school",
ADD COLUMN     "schoolsId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolsId_fkey" FOREIGN KEY ("schoolsId") REFERENCES "Schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
