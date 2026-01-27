import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jawabanId, skor } = body;

    if (!jawabanId || skor === undefined) {
      return NextResponse.json(
        { error: "jawabanId atau skor kosong" },
        { status: 400 }
      );
    }

    const updated = await prisma.jawaban.update({
      where: { id: Number(jawabanId) },
      data: { skor: Number(skor) },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("UPDATE SKOR ERROR:", error);
    return NextResponse.json({ error: "Gagal update skor" }, { status: 500 });
  }
}
