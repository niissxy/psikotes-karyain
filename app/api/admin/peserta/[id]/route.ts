import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ WAJIB pakai await

    const peserta = await prisma.peserta.findUnique({
      where: { id: Number(id) },
      include: {
        jawaban: {
          include: { soal: true },
        },
        hasil: true,
      },
    });

    if (!peserta) {
      return NextResponse.json(
        { error: "Peserta tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(peserta);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
