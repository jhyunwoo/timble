/*
  Warnings:

  - You are about to drop the `subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_diplomaId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "subjectcontent" DROP CONSTRAINT "subjectcontent_subjectId_fkey";

-- DropTable
DROP TABLE "subject";

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "schoolId" INTEGER,
    "diplomaId" TEXT,
    "title" TEXT NOT NULL,
    "open" TEXT[],
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "relatedMajor" TEXT[],

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubjectPrerequisite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectPrerequisite_AB_unique" ON "_SubjectPrerequisite"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectPrerequisite_B_index" ON "_SubjectPrerequisite"("B");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_diplomaId_fkey" FOREIGN KEY ("diplomaId") REFERENCES "diploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectcontent" ADD CONSTRAINT "subjectcontent_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectPrerequisite" ADD CONSTRAINT "_SubjectPrerequisite_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectPrerequisite" ADD CONSTRAINT "_SubjectPrerequisite_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
