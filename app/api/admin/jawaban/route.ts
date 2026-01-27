import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const data = await prisma.peserta.findMany({
            include: {
                jawaban: {
                    include: {
                        soal: true,
                    },
                },
                hasil: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}