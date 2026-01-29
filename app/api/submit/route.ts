import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JenisKelamin } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= UPLOAD FILE SERVER =================
export async function uploadFileServer(file: File, folder: string = "portofolio"): Promise<string> {
  if (!(file instanceof File)) throw new Error("File harus dari input HTML");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Ambil nama file tanpa ekstensi
  const fileName = file.name.replace(/\.[^/.]+$/, "");

  // Upload ke Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    {
      resource_type: "raw", // agar PDF/DOC/DOCX bisa dibuka di browser
      folder,               // folder tujuan: portofolio / jawaban
      public_id: fileName,
      overwrite: true,
    }
  );

  if (!result.secure_url) throw new Error("Upload gagal");
  return result.secure_url;
}

// ================= ROUTE POST =================
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // ================= PORTOFOLIO =================
    const portofolio = formData.get("portofolio") as File | null;
    let portofolioUrl: string | null = null;
    if (portofolio) {
      portofolioUrl = await uploadFileServer(portofolio, "portofolio");
    }

    // ================= SIMPAN PESERTA =================
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

    // ================= JAWABAN =================
    const jawabanList = JSON.parse(formData.get("jawaban") as string);

    for (const j of jawabanList) {
      let jawabanText = j.jawaban;
      let jawabanGambar: string | null = null;

      const file = formData.get(`file_${j.soalId}`) as File | null;
      if (file) {
        jawabanGambar = await uploadFileServer(file, "jawaban");
        jawabanText = ""; // karena ini soal upload
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
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
