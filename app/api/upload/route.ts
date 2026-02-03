export const runtime = "nodejs";

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const type = formData.get("type"); // "gambar" | "portofolio"

  if (!file || !type) {
    return NextResponse.json({ error: "File atau type kosong" }, { status: 400 });
  }

  let bucket = "";
  let allowedTypes: string[] = [];

  if (type === "gambar") {
    bucket = "jawaban-gambar";
    allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  } else if (type === "portofolio") {
    bucket = "jawaban-portofolio";
    allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
  } else {
    return NextResponse.json({ error: "Type tidak valid" }, { status: 400 });
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Format file tidak didukung" }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return NextResponse.json({
    url: data.publicUrl,
    bucket,
    fileName,
  });
}
