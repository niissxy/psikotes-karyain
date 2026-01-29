import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JenisKelamin } from "@prisma/client";
import { uploadFile } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // identitas
    const portofolio = formData.get("portofolio") as File | null;
    let portofolioUrl: string | null = null;

    if (portofolio) {
      portofolioUrl = await uploadFile(portofolio, "portofolio");
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

    // jawaban
    const jawaban = JSON.parse(formData.get("jawaban") as string);

    for (const j of jawaban) {
      let jawabanText = j.jawaban;
      let jawabanGambar: string | null = null;

      const file = formData.get(`file_${j.soalId}`) as File | null;
      if (file) {
        jawabanGambar = await uploadFile(file, "jawaban");
        jawabanText = ""; // karena soal tipe upload
      }

      await prisma.jawaban.create({
        data: {
          pesertaId: peserta.id,
          soalId: j.soalId,
          jawaban_text: jawabanText,
          jawaban_gambar: jawabanGambar,
          skor: 0,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR SUBMIT:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
