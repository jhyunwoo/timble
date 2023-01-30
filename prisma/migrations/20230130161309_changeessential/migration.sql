/*
  Warnings:

  - You are about to drop the column `essentialsubjectsId` on the `subject` table. All the data in the column will be lost.
  - You are about to drop the `essentialsubjects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "essentialsubjects" DROP CONSTRAINT "essentialsubjects_studentgroupId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_essentialsubjectsId_fkey";

-- AlterTable
ALTER TABLE "subject" DROP COLUMN "essentialsubjectsId",
ADD COLUMN     "essentialsId" TEXT;

-- DropTable
DROP TABLE "essentialsubjects";

-- CreateTable
CREATE TABLE "essential" (
    "id" TEXT NOT NULL,
    "studentgroupId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "essential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "essential" ADD CONSTRAINT "essential_studentgroupId_fkey" FOREIGN KEY ("studentgroupId") REFERENCES "studentgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_essentialsId_fkey" FOREIGN KEY ("essentialsId") REFERENCES "essential"("id") ON DELETE SET NULL ON UPDATE CASCADE;
