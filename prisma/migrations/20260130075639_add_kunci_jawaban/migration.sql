-- CreateTable
CREATE TABLE "KunciJawaban" (
    "id" SERIAL NOT NULL,
    "soalId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "KunciJawaban_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KunciJawaban_soalId_key" ON "KunciJawaban"("soalId");

-- AddForeignKey
ALTER TABLE "KunciJawaban" ADD CONSTRAINT "KunciJawaban_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "Soal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
