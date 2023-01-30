-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "essentialsubjectsId" TEXT;

-- CreateTable
CREATE TABLE "essentialsubjects" (
    "id" TEXT NOT NULL,
    "studentgroupId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "essentialsubjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "essentialsubjects" ADD CONSTRAINT "essentialsubjects_studentgroupId_fkey" FOREIGN KEY ("studentgroupId") REFERENCES "studentgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_essentialsubjectsId_fkey" FOREIGN KEY ("essentialsubjectsId") REFERENCES "essentialsubjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
