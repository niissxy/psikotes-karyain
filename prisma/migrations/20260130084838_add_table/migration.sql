/*
  Warnings:

  - You are about to drop the column `keterangan` on the `KunciJawaban` table. All the data in the column will be lost.
  - Added the required column `teks` to the `KunciJawaban` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KunciJawaban" DROP COLUMN "keterangan",
ADD COLUMN     "penjelasan" TEXT,
ADD COLUMN     "teks" TEXT NOT NULL;
