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
    { 
      // 1
      pertanyaan: "Sinonim dari kata “abstrak” adalah…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Nyata" },
        { label: "B", teks: "Kabur" },
        { label: "C", teks: "Konkrit" },
        { label: "D", teks: "Teoretis" }
      ]
    },

    {
      // 2
      pertanyaan: "Dalam satu kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Berapa peluang mengambil bola biru?",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "20%" },
        { label: "B", teks: "30%" },
        { label: "C", teks: "50%" },
        { label: "D", teks: "60%" }
      ]
    },

    {
      // 3
      pertanyaan: "Uang Rp250.000 dibagi rata untuk 5 orang. Tiap orang mendapat…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Rp 40.000" },
        { label: "B", teks: "Rp 45.000" },
        { label: "C", teks:"Rp 50.000" },
        { label: "D", teks:"Rp 55.000" },
      ]
    },

    {
      // 4
      pertanyaan: "Jika 4 orang dapat menyelesaikan sebuah pekerjaan dalam 18 hari, berapa hari yang dibutuhkan jika pekerjanya menjadi 6 orang?",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "10 hari" },
        { label: "B", teks: "12 hari" },
        { label: "C", teks:"14 hari" },
        { label: "D", teks:"16 hari" },
      ]
    },

     {
      // 5
      pertanyaan: "3:2 adalah perbandingan jumlah pensil Andi dan Budi. Jika Andi punya 12 pensil, maka Budi punya… ",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "8" },
        { label: "B", teks: "6" },
        { label: "C", teks:"4" },
        { label: "D", teks:"10" },
      ]
    },

    {
      // 6
      pertanyaan: "Andi lebih tua dari Budi. Budi lebih muda dari Citra. Kesimpulan paling tepat:",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Citra lebih tua dari Andi" },
        { label: "B", teks: "Budi paling tua" },
        { label: "C", teks:"Andi mungkin lebih tua dari Citra" },
        { label: "D", teks:"Tidak bisa disimpulkan" },
      ]
    },

    {
      // 7
      pertanyaan: "Jika Santi suka buku, maka dia pergi ke perpustakaan. Santi tidak pergi ke perpustakaan.",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Santi suka buku" },
        { label: "B", teks: "Santi tidak suka buku" },
        { label: "C", teks:"Santi pergi ke toko buku" },
        { label: "D", teks:"Tidak bisa disimpulkan" },
      ]
    },

    {
      // 8
      pertanyaan: "Jika hari ini hari Kamis, maka 100 hari ke depan adalah hari…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Jumat" },
        { label: "B", teks: "Senin" },
        { label: "C", teks:"Sabtu" },
        { label: "D", teks:"Minggu" },
      ]
    },

    {
      // 9
      pertanyaan: "Jika semua pensil adalah alat tulis dan sebagian alat tulis adalah pulpen, maka…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Semua pensil adalah pulpen" },
        { label: "B", teks: "Semua pulpen adalah pensil" },
        { label: "C", teks:"Tidak semua alat tulis adalah pensil" },
        { label: "D", teks:"Tidak dapat disimpulkan" },
      ]
    },

    {
      // 10
      pertanyaan: "Dalam sebuah lomba, Rani finis setelah Dina, tapi sebelum Tika. Urutan yang benar adalah…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Dina-Rani-Tika" },
        { label: "B", teks: "Rani-Dika-Tika" },
        { label: "C", teks:"Tika-Rani-Dina" },
        { label: "D", teks:"Dina-Tika-Rani" },
      ]
    },

    {
      // 11
      pertanyaan: "Semua kucing adalah hewan. Beberapa hewan adalah burung. Maka…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Semua kucing adalah burung" },
        { label: "B", teks: "Beberapa kucing adalah burung" },
        { label: "C", teks:"Semua kucing adalah burung" },
        { label: "D", teks:"Tidak dapat disimpulkan" },
      ]
    },

    {
      // 12
      pertanyaan: "Jika hari ini hari Kamis, maka 100 hari ke depan adalah hari…",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Jumat" },
        { label: "B", teks: "Senin" },
        { label: "C", teks:"Sabtu" },
        { label: "D", teks:"Minggu" },
      ]
    },

     {
      // 13
      pertanyaan: "Tes Warteg",
      gambar: "/soal-images/tes-warteg.png",
      tipe: "UPLOAD",
      pilihan: []
    },

    {
      // 14
      pertanyaan: "Dokter : Pasien = Guru : …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Murid" },
        { label: "B", teks: "Buku" },
        { label: "C", teks:"Sekolah" },
        { label: "D", teks:"Pelajaran" },
      ]
    },
    
    {
      // 15
      pertanyaan: "Pisau : Tajam = Kapas : …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Putih" },
        { label: "B", teks: "Lembut" },
        { label: "C", teks:"Ringan" },
        { label: "D", teks:"Kecil" },
      ]
    },

    {
      // 16
      pertanyaan: "Mobil : Jalan = Kapal : …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Darat" },
        { label: "B", teks: "Sungai" },
        { label: "C", teks:"Laut" },
        { label: "D", teks:"Dermaga" },
      ]
    },

    {
      // 17
      pertanyaan: "Api : Panas = Es : …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Dingin" },
        { label: "B", teks: "Beku" },
        { label: "C", teks:"Cair" },
        { label: "D", teks:"Air" },
      ]
    },

    {
      // 18
      pertanyaan: "Matahari : Siang = Bulan : …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Terang" },
        { label: "B", teks: "Malam" },
        { label: "C", teks:"Bintang" },
        { label: "D", teks:"Awan" },
      ]
    },

    {
      // 19
      pertanyaan: "Kucing, Harimau, Singa, Sapi",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Kucing" },
        { label: "B", teks: "Harimau" },
        { label: "C", teks:"Sapi" },
        { label: "D", teks:"Singa" },
      ]
    },

    {
      // 20
      pertanyaan: "Melati : Putih = Mawar : …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "Merah" },
        { label: "B", teks: "Harum" },
        { label: "C", teks:"Tajam" },
        { label: "D", teks:"Indah" },
      ]
    },

    {
      // 21
      pertanyaan: "52. 21, 18, 15, 12, …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "10" },
        { label: "B", teks: "9" },
        { label: "C", teks:"8" },
        { label: "D", teks:"6" },
      ]
    },

    {
      // 22
      pertanyaan: "53. 13, 26, 52, …",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "65" },
        { label: "B", teks: "78" },
        { label: "C", teks:"100" },
        { label: "D", teks:"104" },
      ]
    },

    {
      // 23
      pertanyaan: "Mana gambar selanjutnya?",
      gambar: "/soal-images/tes-pic1.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
      ]
    },

    {
      // 24
      pertanyaan: "Mana gambar selanjutnya?",
      gambar: "/soal-images/tes-pic2.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
      ]
    },

    {
      // 25
      pertanyaan: "Mana gambar selanjutnya?",
      gambar: "/soal-images/tes-pic3.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
      ]
    },

    {
      // 26
      pertanyaan: "Mana gambar selanjutnya?",
      gambar: "/soal-images/tes-pic4.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
        { label: "F" },
        { label: "G" },
        { label: "H" },
      ]
    },

    {
      // 27
      pertanyaan: "Mana gambar selanjutnya?",
      gambar: "/soal-images/tes-pic5.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
        { label: "F" },
        { label: "G" },
        { label: "H" },
      ]
    },

    {
      // 28
      pertanyaan: "Mana gambar selanjutnya?",
      gambar: "/soal-images/tes-pic6.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
        { label: "F" },
        { label: "G" },
        { label: "H" },
      ]
    },

    {
      // 29
      pertanyaan: "Mana gambar yang hilang?",
      gambar: "/soal-images/tes-pic7.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
        { label: "F" },
      ]
    },

    {
      // 30
      pertanyaan: "Mana gambar yang hilang?",
      gambar: "/soal-images/tes-pic8.png",
      tipe: "PILIHAN",
      pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
        { label: "E" },
        { label: "F" },
      ]
    },

    {
      // 31
      pertanyaan: "",
      gambar: "/soal-images/tes-pic9.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 32
      pertanyaan: "",
      gambar: "/soal-images/tes-pic10.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

     {
      // 33
      pertanyaan: "",
      gambar: "/soal-images/tes-pic11.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

     {
      // 34
      pertanyaan: "",
      gambar: "/soal-images/tes-pic12.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 35
      pertanyaan: "",
      gambar: "/soal-images/tes-pic13.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 36
      pertanyaan: "",
      gambar: "/soal-images/tes-pic14.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 37
      pertanyaan: "",
      gambar: "/soal-images/tes-pic15.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 38
      pertanyaan: "",
      gambar: "/soal-images/tes-pic16.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 39
      pertanyaan: "",
      gambar: "/soal-images/tes-pic17.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    },

    {
      // 40
      pertanyaan: "",
      gambar: "/soal-images/tes-pic18.png",
      tipe: "PILIHAN",
       pilihan: [
        { label: "A"},
        { label: "B"},
        { label: "C"},
        { label: "D"},
      ]
    }
  ];

  for (let s of soals) {
    await prisma.soal.create({
      data: { 
        pertanyaan: s.pertanyaan,
        gambar: s.gambar,
        tipe: s.tipe,
        pilihan: {
          create: s.pilihan
        },
      },
    });
  }

  console.log("Seed berhasil");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
