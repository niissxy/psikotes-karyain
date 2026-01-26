import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama, umur, jawaban } = body;

    // 1. simpan peserta
    const peserta = await prisma.peserta.create({
      data: {
        nama,
        umur,
      },
    });

    // 2. simpan jawaban
    let totalSkor = 0;

    for (const j of jawaban) {
      await prisma.jawaban.create({
        data: {
          pesertaId: peserta.id,
          soalId: j.soalId,
          skor: Number(j.skor) || 0,
        },
      });

      totalSkor += Number(j.skor) || 0;
    }

    const skorFinal = Math.min(totalSkor, 100);

    // 3. simpan hasil
    const hasil = await prisma.hasil.create({
      data: {
        pesertaId: peserta.id,
        skor: skorFinal,
      },
    });

    return NextResponse.json({
      success: true,
      skor: hasil.skor,
    });
  } catch (error) {
    console.error("ERROR SUBMIT:", error);

    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
