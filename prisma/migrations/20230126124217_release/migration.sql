-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_areaId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_difficultyId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_typeId_fkey";

-- AlterTable
ALTER TABLE "subject" ALTER COLUMN "difficultyId" DROP NOT NULL,
ALTER COLUMN "areaId" DROP NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "subjectArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "subjectType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
