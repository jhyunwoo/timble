/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "ClassContent" DROP CONSTRAINT "ClassContent_classId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_schoolId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassContent";

-- DropTable
DROP TABLE "School";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "school" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classinfo" (
    "id" SERIAL NOT NULL,
    "schoolId" INTEGER,
    "title" TEXT NOT NULL,
    "diploma" TEXT,
    "open" TEXT[],
    "prerequisite" TEXT[],
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "relatedMajor" TEXT[],

    CONSTRAINT "classinfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classcontent" (
    "id" TEXT NOT NULL,
    "classId" INTEGER,
    "area" TEXT NOT NULL,
    "mainTarget" TEXT[],
    "detail" TEXT NOT NULL,

    CONSTRAINT "classcontent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_code_key" ON "school"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classinfo" ADD CONSTRAINT "classinfo_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classcontent" ADD CONSTRAINT "classcontent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classinfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
