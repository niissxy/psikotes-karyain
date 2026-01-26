/*
  Warnings:

  - Added the required column `instansi` to the `Peserta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `Peserta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kontak` to the `Peserta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_lahir` to the `Peserta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tingkat_pendidikan` to the `Peserta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- AlterTable
ALTER TABLE "Peserta" ADD COLUMN     "instansi" TEXT NOT NULL,
ADD COLUMN     "jenis_kelamin" "JenisKelamin" NOT NULL,
ADD COLUMN     "kontak" TEXT NOT NULL,
ADD COLUMN     "tanggal_lahir" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tingkat_pendidikan" TEXT NOT NULL;
