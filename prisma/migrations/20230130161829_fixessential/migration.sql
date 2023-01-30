/*
  Warnings:

  - You are about to drop the column `year` on the `essential` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "essential" DROP COLUMN "year",
ALTER COLUMN "semester" SET DATA TYPE TEXT;
