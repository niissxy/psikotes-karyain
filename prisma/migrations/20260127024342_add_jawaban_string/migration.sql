/*
  Warnings:

  - Added the required column `jawaban_text` to the `Jawaban` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jawaban" ADD COLUMN     "jawaban_text" TEXT NOT NULL;
