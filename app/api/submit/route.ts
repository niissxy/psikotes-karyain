export const runtime = "nodejs";

import { uploadToSupabase } from "@/lib/uploadSupabase";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const formData = await req.formData();

  // PORTOFOLIO
  const portofolio = formData.get("portofolio") as File | null;
  let portofolioUrl: string | null = null;

  if (portofolio) {
    portofolioUrl = await uploadToSupabase(portofolio, "portofolio");
  }

  const peserta = await prisma.peserta.create({
    data: {
      nama: formData.get("nama") as string,
      umur: Number(formData.get("umur")),
      tanggal_lahir: new Date(formData.get("tanggal_lahir") as string),
      jenis_kelamin: formData.get("jenis_kelamin") as any,
      tingkat_pendidikan: formData.get("tingkat_pendidikan") as string,
      instansi: formData.get("instansi") as string,
      kontak: formData.get("kontak") as string,
      portofolio: portofolioUrl,
    },
  });

  const jawabanList = JSON.parse(formData.get("jawaban") as string);

  for (const j of jawabanList) {
    let jawabanText = j.jawaban;
    let jawabanGambar: string | null = null;

    const file = formData.get(`file_${j.soalId}`) as File | null;

    if (file) {
      jawabanGambar = await uploadToSupabase(file, "jawaban-gambar");
      jawabanText = "";
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
}
