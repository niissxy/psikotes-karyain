import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const peserta = await prisma.peserta.findMany();
  return NextResponse.json(peserta);
}
