/*
  Warnings:

  - Added the required column `order` to the `subjectcontent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subjectcontent" ADD COLUMN     "order" INTEGER NOT NULL;
