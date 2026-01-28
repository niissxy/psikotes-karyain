import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { JenisKelamin } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const portofolio = formData.get("portofolio") as File | null;

    let portofolioUrl: string | null = null;

   if (portofolio) {
  const bytes = await portofolio.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = Date.now() + "-" + portofolio.name;

  const uploadDir = path.join(process.cwd(), "public/uploads");

  // pastikan folder ada
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uploadPath = path.join(uploadDir, filename);

  fs.writeFileSync(uploadPath, buffer);

  portofolioUrl = `/uploads/${filename}`;
}


    const peserta = await prisma.peserta.create({
      data: {
        nama: formData.get("nama") as string,
        umur: Number(formData.get("umur")),
        tanggal_lahir: new Date(formData.get("tanggal_lahir") as string),
        jenis_kelamin: formData.get("jenis_kelamin") as JenisKelamin,
        tingkat_pendidikan: formData.get("tingkat_pendidikan") as string,
        instansi: formData.get("instansi") as string,
        kontak: formData.get("kontak") as string,
        portofolio: portofolioUrl,
      },
    });

    const jawaban = JSON.parse(formData.get("jawaban") as string);

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
