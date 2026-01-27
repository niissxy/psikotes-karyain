import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const peserta = await prisma.peserta.findMany({
        select: {
            id: true,
            nama: true,
        },
    });

    return NextResponse.json(peserta);
}