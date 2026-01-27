import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nama,
      umur,
      tanggal_lahir,
      jenis_kelamin,
      tingkat_pendidikan,
      instansi,
      kontak,
      jawaban,
    } = body;

    const peserta = await prisma.peserta.create({
      data: {
        nama,
        umur: Number(umur),
        tanggal_lahir: new Date(tanggal_lahir),
        jenis_kelamin,
        tingkat_pendidikan,
        instansi,
        kontak,
      },
    });

    // const jumlahSoal = await prisma.soal.count();

    // let totalSkor = 0;

    for (const j of jawaban) {
      await prisma.jawaban.create({
        data: {
          pesertaId: peserta.id,
          soalId: j.soalId,
          jawaban_text: j.jawaban,
          skor: 0,
        },
      });

      // totalSkor += Number(j.skor) || 0;
    }

    // const maxScore = jumlahSoal * 5;
    // const skorFinal = Math.round((totalSkor / maxScore) * 100);

    // const hasil = await prisma.hasil.create({
    //   data: {
    //     pesertaId: peserta.id,
    //     skor: skorFinal,
    //   },
    // });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("ERROR SUBMIT:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
