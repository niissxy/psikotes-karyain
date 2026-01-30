import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pesertaList = await prisma.peserta.findMany({
      include: {
        jawaban: {
          include: { 
            soal: {
              include: {
                pilihan: true,
              }
            }
          }, // termasuk soal untuk setiap jawaban
        },
      },
    });

    return NextResponse.json(pesertaList);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
