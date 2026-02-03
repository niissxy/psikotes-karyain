import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 8);

    await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ success: false, message: "Email sudah terdaftar" });
    }

    return NextResponse.json({ success: false, message: "Terjadi kesalahan" });
  }
}