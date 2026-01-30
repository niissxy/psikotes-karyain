/*
  Warnings:

  - You are about to drop the `KunciJawaban` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kunci_jawaban` to the `Soal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KunciJawaban" DROP CONSTRAINT "KunciJawaban_soalId_fkey";

-- AlterTable
ALTER TABLE "Soal" ADD COLUMN     "kunci_jawaban" TEXT NOT NULL;

-- DropTable
DROP TABLE "KunciJawaban";
