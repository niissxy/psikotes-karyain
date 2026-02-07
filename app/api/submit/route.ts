export const runtime = "nodejs";

import { uploadToSupabase } from "@/lib/uploadSupabase";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const formData = await req.formData();

  // const allowedPosisi = ["Accounting", "Design Grafis", "Admin", "Content Creator", "Staff Laundry", "Kurir", "Web Development", "Produksi/Teknisi", "Customer Service"];

  // if (!allowedPosisi.includes(posisi)) {
  //   return NextResponse.json({ success: false, message: "Posisi tidak valid"});
  // }
  
  const posisi = formData.get("posisi")?.toString();
  const nama = formData.get("nama")?.toString();

if (!posisi) {
  return NextResponse.json({
    success: false,
    message: "Posisi wajib dipilih",
  }, { status: 400 });
}

if (!nama) {
  return NextResponse.json({
    success: false,
    message: "Nama wajib diisi",
  }, { status: 400 });
}

  // PORTOFOLIO
  const portofolio = formData.get("portofolio") as File | null;
  let portofolioUrl: string | null = null;

  if (portofolio) {
    portofolioUrl = await uploadToSupabase(portofolio, "portofolio");
  }

 const peserta = await prisma.peserta.create({
  data: {
    nama: formData.get("nama")!.toString(),
    umur: Number(formData.get("umur")),
    tanggal_lahir: new Date(formData.get("tanggal_lahir")!.toString()),
    jenis_kelamin: formData.get("jenis_kelamin") as any,
    tingkat_pendidikan: formData.get("tingkat_pendidikan")!.toString(),
    instansi: formData.get("instansi")!.toString(),
    posisi: posisi, // hasil validasi di atas
    kontak: formData.get("kontak")!.toString(),

    domisili: formData.get("domisili")?.toString() || null,
    kendaraan: formData.get("kendaraan")?.toString() || null,
    kesibukan: formData.get("kesibukan")?.toString() || null,

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
