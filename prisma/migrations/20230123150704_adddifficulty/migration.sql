-- CreateEnum
CREATE TYPE "difficulties" AS ENUM ('BASIC', 'HONOR', 'BILINGUAL');

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "difficulty" "difficulties" NOT NULL DEFAULT 'BASIC';
