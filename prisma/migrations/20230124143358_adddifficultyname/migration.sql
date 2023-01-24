/*
  Warnings:

  - Added the required column `name` to the `difficulty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "difficulty" ADD COLUMN     "name" TEXT NOT NULL;
