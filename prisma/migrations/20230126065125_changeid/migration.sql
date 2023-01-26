/*
  Warnings:

  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_SubjectPrerequisite" DROP CONSTRAINT "_SubjectPrerequisite_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectPrerequisite" DROP CONSTRAINT "_SubjectPrerequisite_B_fkey";

-- DropForeignKey
ALTER TABLE "_diplomaTosubject" DROP CONSTRAINT "_diplomaTosubject_B_fkey";

-- DropForeignKey
ALTER TABLE "period" DROP CONSTRAINT "period_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "subjectcontent" DROP CONSTRAINT "subjectcontent_subjectId_fkey";

-- AlterTable
ALTER TABLE "_SubjectPrerequisite" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_diplomaTosubject" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "period" ALTER COLUMN "subjectId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "subject" DROP CONSTRAINT "subject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "subject_id_seq";

-- AlterTable
ALTER TABLE "subjectcontent" ALTER COLUMN "subjectId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectcontent" ADD CONSTRAINT "subjectcontent_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectPrerequisite" ADD CONSTRAINT "_SubjectPrerequisite_A_fkey" FOREIGN KEY ("A") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectPrerequisite" ADD CONSTRAINT "_SubjectPrerequisite_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_diplomaTosubject" ADD CONSTRAINT "_diplomaTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
