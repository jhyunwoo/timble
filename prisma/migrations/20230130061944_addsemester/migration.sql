/*
  Warnings:

  - Added the required column `semester` to the `essentialsubjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "essentialsubjects" ADD COLUMN     "semester" INTEGER NOT NULL;
