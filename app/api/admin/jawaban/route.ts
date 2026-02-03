import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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