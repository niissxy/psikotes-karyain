import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const peserta = await prisma.peserta.findUnique({
      where: { id: Number(params.id) },
      include: {
        jawaban: {
          include: {
            soal: {
              include: {
                pilihan: true,
              },
            },
          },
        },
      },
    });

    if (!peserta) {
      return NextResponse.json(
        { error: "Peserta tidak ditemukan" },
        { status: 404 }
      );
    }

    // fix path gambar soal
    const jawabanWithGambar = peserta.jawaban.map((j) => ({
  ...j,
  soal: {
    ...j.soal,
    gambar: j.soal.gambar
  ? `/soal-images/${j.soal.gambar.replace(/^\/+/, "")}`
  : null,

  },
}));

    return NextResponse.json({
      ...peserta,
      jawaban: jawabanWithGambar,
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
