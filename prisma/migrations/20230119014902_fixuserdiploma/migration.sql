/*
  Warnings:

  - You are about to drop the column `diploma` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "diploma",
ADD COLUMN     "diplomaId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_diplomaId_fkey" FOREIGN KEY ("diplomaId") REFERENCES "diploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;
