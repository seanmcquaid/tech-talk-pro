/*
  Warnings:

  - Added the required column `userId` to the `Slide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "userId" TEXT NOT NULL;
