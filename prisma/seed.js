require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const soals = [
    "1 + 1",
    "1 + 2",
    "1 + 3",
    "1 + 4",
    "1 + 5",
    "1 + 6",
    "1 + 7",
    "1 + 8",
    "1 + 9",
    "1 + 10",
    "1 x 1",
    "1 x 2",
    "1 x 3",
    "1 x 4",
    "1 x 5",
    "1 x 6",
    "1 x 7",
    "1 x 8",
    "1 x 9",
    "1 x 10",
    "Ibu Kota Indonesia?",
    "Presiden Pertama Indonesia?",
    "Hari Kartini Diperingati Setiap Tanggal?",
    "Tanggal 10 November Diperingati Sebagai Hari?",
    "Ibu Kota Jawa Tengah",
    "Bapak Pendidikan Indonesia?",
    "Lokasi Teks Proklamasi Dibacakan?",
    "Tahun Proklamasi Kemerdekaan Indonesia?",
    "Lambang Negara Indonesia?",
    "BPUPKI Adalah Singkatan Dari?",
    "Lawan Kata Malam?",
    "Proses Tumbuhan Membuat Makanan Sendiri Disebut?",
    "Planet Terdekat Dengan Matahari?",
    "Sila Ke-4 Pancasila Berbunyi?",
    "Kalimat Utama Dalam Paragraf Disebut?",
    "Alat Untuk Mengukur Suhu?",
    "Gunung Tertinggi di Indonesia?",
    "Tokoh Perumus Pancasila?",
    "Yang Termasuk Bilangan Prima?",
    "Benua Terbesar?"
  ];

  for (let s of soals) {
    await prisma.soal.create({
      data: { pertanyaan: s }
    });
  }

  console.log("Seed berhasil");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
