/*
  Warnings:

  - Added the required column `posisi` to the `Peserta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Peserta" ADD COLUMN     "posisi" TEXT NOT NULL;
