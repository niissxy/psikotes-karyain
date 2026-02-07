export const runtime = "nodejs";

import { uploadToSupabase } from "@/lib/uploadSupabase";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // === VALIDASI FIELD WAJIB ===
    const nama = formData.get("nama")?.toString();
    const posisi = formData.get("posisi")?.toString();
    const tanggalLahirStr = formData.get("tanggal_lahir")?.toString();
    const jawabanRaw = formData.get("jawaban")?.toString();

    if (!nama) {
      return NextResponse.json({ success: false, message: "Nama wajib diisi" }, { status: 400 });
    }

    if (!posisi) {
      return NextResponse.json({ success: false, message: "Posisi wajib dipilih" }, { status: 400 });
    }

    if (!tanggalLahirStr) {
      return NextResponse.json({ success: false, message: "Tanggal lahir wajib diisi" }, { status: 400 });
    }

    const tanggalLahir = new Date(tanggalLahirStr);
    if (isNaN(tanggalLahir.getTime())) {
      return NextResponse.json({ success: false, message: "Format tanggal lahir tidak valid" }, { status: 400 });
    }

    if (!jawabanRaw) {
      return NextResponse.json({ success: false, message: "Jawaban tidak boleh kosong" }, { status: 400 });
    }

    let jawabanList: any[];
    try {
      jawabanList = JSON.parse(jawabanRaw);
    } catch {
      return NextResponse.json({ success: false, message: "Format jawaban tidak valid" }, { status: 400 });
    }

    // === UPLOAD PORTOFOLIO ===
    const portofolio = formData.get("portofolio") as File | null;
    let portofolioUrl: string | null = null;

    if (portofolio) {
      try {
        portofolioUrl = await uploadToSupabase(portofolio, "portofolio");
      } catch (err) {
        console.error("Upload portofolio gagal:", err);
        return NextResponse.json({ success: false, message: "Upload portofolio gagal" }, { status: 500 });
      }
    }

    // === SIMPAN PESERTA ===
    const peserta = await prisma.peserta.create({
      data: {
        nama,
        umur: Number(formData.get("umur")),
        tanggal_lahir: tanggalLahir,
        jenis_kelamin: formData.get("jenis_kelamin") as any,
        tingkat_pendidikan: formData.get("tingkat_pendidikan")?.toString() || "",
        instansi: formData.get("instansi")?.toString() || "",
        posisi,
        kontak: formData.get("kontak")?.toString() || "",

        domisili: formData.get("domisili")?.toString() || null,
        kendaraan: formData.get("kendaraan")?.toString() || null,
        kesibukan: formData.get("kesibukan")?.toString() || null,

        portofolio: portofolioUrl,
      },
    });

    // === SIMPAN JAWABAN ===
    for (const j of jawabanList) {
      let jawabanText = j.jawaban ?? "";
      let jawabanGambar: string | null = null;

      const file = formData.get(`file_${j.soalId}`) as File | null;

      if (file) {
        try {
          jawabanGambar = await uploadToSupabase(file, "jawaban-gambar");
          jawabanText = "";
        } catch (err) {
          console.error("Upload jawaban gambar gagal:", err);
          return NextResponse.json({ success: false, message: "Upload gambar jawaban gagal" }, { status: 500 });
        }
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
    console.error("SUBMIT ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat submit data" },
      { status: 500 }
    );
  }
}
