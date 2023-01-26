/*
  Warnings:

  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timetable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectTodiploma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_difficultyId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_subjectAreaId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_subjectTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_userId_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectPrerequisite" DROP CONSTRAINT "_SubjectPrerequisite_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectPrerequisite" DROP CONSTRAINT "_SubjectPrerequisite_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectTodiploma" DROP CONSTRAINT "_SubjectTodiploma_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectTodiploma" DROP CONSTRAINT "_SubjectTodiploma_B_fkey";

-- DropForeignKey
ALTER TABLE "period" DROP CONSTRAINT "period_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "period" DROP CONSTRAINT "period_timetableId_fkey";

-- DropForeignKey
ALTER TABLE "subjectcontent" DROP CONSTRAINT "subjectcontent_subjectId_fkey";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "Timetable";

-- DropTable
DROP TABLE "_SubjectTodiploma";

-- CreateTable
CREATE TABLE "timetable" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "semester" TEXT NOT NULL,

    CONSTRAINT "timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" SERIAL NOT NULL,
    "schoolId" INTEGER,
    "title" TEXT NOT NULL,
    "open" TEXT[],
    "difficultyId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "relatedMajor" TEXT NOT NULL,
    "targetParticipants" TEXT NOT NULL,
    "CSATSubject" BOOLEAN NOT NULL,
    "studentgroupId" TEXT,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_diplomaTosubject" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_diplomaTosubject_AB_unique" ON "_diplomaTosubject"("A", "B");

-- CreateIndex
CREATE INDEX "_diplomaTosubject_B_index" ON "_diplomaTosubject"("B");

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "subjectArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "subjectType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_studentgroupId_fkey" FOREIGN KEY ("studentgroupId") REFERENCES "studentgroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectcontent" ADD CONSTRAINT "subjectcontent_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectPrerequisite" ADD CONSTRAINT "_SubjectPrerequisite_A_fkey" FOREIGN KEY ("A") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectPrerequisite" ADD CONSTRAINT "_SubjectPrerequisite_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_diplomaTosubject" ADD CONSTRAINT "_diplomaTosubject_A_fkey" FOREIGN KEY ("A") REFERENCES "diploma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_diplomaTosubject" ADD CONSTRAINT "_diplomaTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
