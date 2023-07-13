/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Talk" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "talkLength" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "abstract" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "talkId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "bulletPoints" TEXT[],
    "notes" TEXT[],

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);
