/*
  Warnings:

  - Made the column `category` on table `Talk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Talk" ALTER COLUMN "category" SET NOT NULL;
