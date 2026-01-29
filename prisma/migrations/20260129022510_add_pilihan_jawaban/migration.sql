/*
  Warnings:

  - Added the required column `tipe` to the `Soal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipeSoal" AS ENUM ('PILIHAN', 'UPLOAD');

-- AlterTable
ALTER TABLE "Jawaban" ADD COLUMN     "jawaban_gambar" TEXT;

-- AlterTable
ALTER TABLE "Soal" ADD COLUMN     "tipe" "TipeSoal" NOT NULL;

-- CreateTable
CREATE TABLE "PilihanJawaban" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "teks" TEXT,
    "soalId" INTEGER NOT NULL,

    CONSTRAINT "PilihanJawaban_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PilihanJawaban" ADD CONSTRAINT "PilihanJawaban_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "Soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
