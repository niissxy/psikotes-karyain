import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { JenisKelamin } from "@prisma/client";

export const runtime = "nodejs";

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

const jawaban13 = formData.get("jawaban13") as File | null;

let jawaban13Url: string | null = null;

if (jawaban13) {
  const bytes = await jawaban13.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = Date.now() + "-jawaban13-" + jawaban13.name;
  const uploadDir = path.join(process.cwd(), "public/uploads/jawaban");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uploadPath = path.join(uploadDir, filename);
  fs.writeFileSync(uploadPath, buffer);

  jawaban13Url = `/uploads/jawaban/${filename}`;
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
  let jawabanText = j.jawaban;
  let jawabanGambar: string | null = null;

  // ambil file berdasarkan soalId
  const file = formData.get(`file_${j.soalId}`) as File | null;

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = Date.now() + "-" + file.name;
    const uploadDir = path.join(process.cwd(), "public/uploads/jawaban");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, filename);
    fs.writeFileSync(uploadPath, buffer);

    jawabanGambar = `/uploads/jawaban/${filename}`;
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
