/*
  Warnings:

  - Added the required column `subjectArea` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "subjectAreas" AS ENUM ('EXPLORATION', 'PRO', 'PRO1', 'PRO2', 'CULTURE', 'CARERR', 'FOUNDATION', 'PEANDART');

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "subjectArea" "subjectAreas" NOT NULL;
