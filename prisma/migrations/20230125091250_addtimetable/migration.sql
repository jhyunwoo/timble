/*
  Warnings:

  - You are about to drop the column `class1` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the column `class2` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the column `class3` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the column `class4` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the column `class5` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the column `class6` on the `Timetable` table. All the data in the column will be lost.
  - Added the required column `name` to the `Timetable` table without a default value. This is not possible if the table is not empty.
  - Made the column `year` on table `Timetable` required. This step will fail if there are existing NULL values in that column.
  - Made the column `semi` on table `Timetable` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "class1",
DROP COLUMN "class2",
DROP COLUMN "class3",
DROP COLUMN "class4",
DROP COLUMN "class5",
DROP COLUMN "class6",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "semi" SET NOT NULL;

-- CreateTable
CREATE TABLE "period" (
    "id" TEXT NOT NULL,
    "timetableId" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "period_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
