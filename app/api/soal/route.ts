export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const soals = await prisma.soal.findMany({
      include: {
        pilihan: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(soals);
  } catch (error) {
    console.error("API SOAL ERROR:", error);
    return NextResponse.json(
      { error: "Gagal ambil soal" },
      { status: 500 }
    );
  }
}
