/*
  Warnings:

  - Changed the type of `type` on the `Subject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "subjectType" AS ENUM ('COMMON', 'SERIES', 'COURSE', 'FREE');

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "type",
ADD COLUMN     "type" "subjectType" NOT NULL;
