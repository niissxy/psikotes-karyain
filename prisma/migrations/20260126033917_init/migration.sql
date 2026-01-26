-- CreateTable
CREATE TABLE "Peserta" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "umur" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Peserta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soal" (
    "id" SERIAL NOT NULL,
    "pertanyaan" TEXT NOT NULL,

    CONSTRAINT "Soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jawaban" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "soalId" INTEGER NOT NULL,
    "skor" INTEGER NOT NULL,

    CONSTRAINT "Jawaban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hasil" (
    "id" SERIAL NOT NULL,
    "pesertaId" INTEGER NOT NULL,
    "skor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Hasil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hasil_pesertaId_key" ON "Hasil"("pesertaId");

-- AddForeignKey
ALTER TABLE "Jawaban" ADD CONSTRAINT "Jawaban_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jawaban" ADD CONSTRAINT "Jawaban_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "Soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasil" ADD CONSTRAINT "Hasil_pesertaId_fkey" FOREIGN KEY ("pesertaId") REFERENCES "Peserta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
