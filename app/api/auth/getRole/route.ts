import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({ role: null }, { status: 401 });

  return NextResponse.json({ role: session.user.role });
}
