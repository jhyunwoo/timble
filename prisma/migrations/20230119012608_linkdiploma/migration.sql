-- AlterTable
ALTER TABLE "diploma" ADD COLUMN     "schoolId" INTEGER;

-- AddForeignKey
ALTER TABLE "diploma" ADD CONSTRAINT "diploma_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;
