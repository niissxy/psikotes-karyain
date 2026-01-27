import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const {jawabanId, skor} = body;

    await prisma.jawaban.update({
        where: { id: jawabanId },
        data: { skor },
    });

    return NextResponse.json({ success: true });
}