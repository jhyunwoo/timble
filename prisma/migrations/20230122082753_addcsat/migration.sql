/*
  Warnings:

  - Added the required column `CSATSubject` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetParticipants` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "CSATSubject" BOOLEAN NOT NULL,
ADD COLUMN     "targetParticipants" TEXT NOT NULL;
