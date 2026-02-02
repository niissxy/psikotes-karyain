import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // params adalah Promise
) {
  try {
    const { id } = await context.params;
    const peserta = await prisma.peserta.findUnique({
      where: { id: Number(id) }, // prisma harus Number
      include: {
        jawaban: {
          include: { 
            soal: {
              include: {
                pilihan: true,
              }
            }
           }
        },
      },
    });

    if (!peserta) {
      return NextResponse.json({ error: "Peserta tidak ditemukan" }, { status: 404 });
    }

    // fix path gambar soal
    const jawabanWithGambar = peserta.jawaban.map((j: any) => ({
      ...j,
      soal: {
        ...j.soal,
        gambar: j.soal.gambar
          ? j.soal.gambar.startsWith("/")
            ? j.soal.gambar
            : `/soal-images/${j.soal.gambar}`
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
