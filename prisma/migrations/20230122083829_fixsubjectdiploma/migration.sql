/*
  Warnings:

  - You are about to drop the column `diplomaId` on the `Subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_diplomaId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "diplomaId";

-- CreateTable
CREATE TABLE "_SubjectTodiploma" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectTodiploma_AB_unique" ON "_SubjectTodiploma"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectTodiploma_B_index" ON "_SubjectTodiploma"("B");

-- AddForeignKey
ALTER TABLE "_SubjectTodiploma" ADD CONSTRAINT "_SubjectTodiploma_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectTodiploma" ADD CONSTRAINT "_SubjectTodiploma_B_fkey" FOREIGN KEY ("B") REFERENCES "diploma"("id") ON DELETE CASCADE ON UPDATE CASCADE;
