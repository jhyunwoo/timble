/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `subjectArea` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Subject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "difficulty",
DROP COLUMN "subjectArea",
DROP COLUMN "type",
ADD COLUMN     "difficultyId" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "subjectAreaId" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "subjectTypeId" TEXT NOT NULL DEFAULT 'none';

-- DropEnum
DROP TYPE "difficulties";

-- DropEnum
DROP TYPE "subjectAreas";

-- DropEnum
DROP TYPE "subjectType";

-- CreateTable
CREATE TABLE "subjectType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "subjectType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjectArea" (
    "id" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "subjectArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "difficulty" (
    "id" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "difficulty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_subjectTypeId_fkey" FOREIGN KEY ("subjectTypeId") REFERENCES "subjectType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_subjectAreaId_fkey" FOREIGN KEY ("subjectAreaId") REFERENCES "subjectArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectType" ADD CONSTRAINT "subjectType_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectArea" ADD CONSTRAINT "subjectArea_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "difficulty" ADD CONSTRAINT "difficulty_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
