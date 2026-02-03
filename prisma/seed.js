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
      ],
      kunci_jawaban: "D",
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "A"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "D"
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
      ],
      kunci_jawaban: "A"
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
      ],
      kunci_jawaban: "D"
    },

    {
      // 12
      pertanyaan: "Suatu seri : 100-4-90-7-80",
      gambar: null,
      tipe: "PILIHAN",
      pilihan: [
        { label: "A", teks: "8" },
        { label: "B", teks: "9" },
        { label: "C", teks:"10" },
        { label: "D", teks:"11" },
        { label: "D", teks:"12" },
      ],
      kunci_jawaban: "C"
    },

     {
      // 13
      pertanyaan: "Tes Warteg",
      gambar: "/soal-images/tes-warteg.png",
      tipe: "UPLOAD",
      pilihan: [],
      kunci_jawaban: "GAMBAR"
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
      ],
      kunci_jawaban: "A"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "A"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "A"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "D"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "E"
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
      ],
      kunci_jawaban: "A"
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
      ],
      kunci_jawaban: "F"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "G"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "F"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "B"
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
      ],
      kunci_jawaban: "A"
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
        { label: "E"},
        { label: "F"},
        { label: "G"},
        { label: "H"},
      ],
      kunci_jawaban: "E"
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
      ],
      kunci_jawaban: "C"
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
      ],
      kunci_jawaban: "B"
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
        kunci_jawaban: s.kunci_jawaban,
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
