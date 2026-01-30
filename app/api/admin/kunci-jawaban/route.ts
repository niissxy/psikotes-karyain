// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const data = await prisma.soal.findMany({
//     include: {
//       pilihan: true,
//       kunci_jawaban: true,
//     },
//     orderBy: { id: "asc" },
//   });

//   return NextResponse.json(data);
// }
