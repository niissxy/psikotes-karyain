import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const pesertaId = Number(searchParams.get("pesertaId"));

    const jawaban = await prisma.jawaban.findMany({
        where: {pesertaId},
        include: {
            soal: true,
        },
    });

    return NextResponse.json(jawaban);
}