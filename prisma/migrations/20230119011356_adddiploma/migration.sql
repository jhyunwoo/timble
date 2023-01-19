/*
  Warnings:

  - You are about to drop the `classcontent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classinfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classcontent" DROP CONSTRAINT "classcontent_classId_fkey";

-- DropForeignKey
ALTER TABLE "classinfo" DROP CONSTRAINT "classinfo_schoolId_fkey";

-- DropTable
DROP TABLE "classcontent";

-- DropTable
DROP TABLE "classinfo";

-- CreateTable
CREATE TABLE "subject" (
    "id" SERIAL NOT NULL,
    "schoolId" INTEGER,
    "title" TEXT NOT NULL,
    "open" TEXT[],
    "prerequisite" TEXT[],
    "diplomaId" INTEGER,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "relatedMajor" TEXT[],

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjectcontent" (
    "id" TEXT NOT NULL,
    "subjectId" INTEGER,
    "area" TEXT NOT NULL,
    "mainTarget" TEXT[],
    "detail" TEXT NOT NULL,

    CONSTRAINT "subjectcontent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diploma" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "diploma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_diplomaId_fkey" FOREIGN KEY ("diplomaId") REFERENCES "diploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectcontent" ADD CONSTRAINT "subjectcontent_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
