/*
  Warnings:

  - The primary key for the `diploma` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_diplomaId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_diplomaId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "diplomaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "diploma" DROP CONSTRAINT "diploma_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "diploma_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "diploma_id_seq";

-- AlterTable
ALTER TABLE "subject" ALTER COLUMN "diplomaId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_diplomaId_fkey" FOREIGN KEY ("diplomaId") REFERENCES "diploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_diplomaId_fkey" FOREIGN KEY ("diplomaId") REFERENCES "diploma"("id") ON DELETE SET NULL ON UPDATE CASCADE;
