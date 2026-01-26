import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const soals = await prisma.soal.findMany();
  return NextResponse.json(soals);
}
