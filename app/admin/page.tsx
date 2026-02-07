"use client";

import { cache, useEffect, useState } from "react";
import Swal from "sweetalert2";

type Soal = {
  id: number;
  pertanyaan: string;
  gambar?: string | null;
  tipe: "PILIHAN" | "UPLOAD";
  pilihan: { id: number; label: string; teks?: string }[];
  kunci_jawaban: string;
};

type Jawaban = {
  id: number;
  jawaban_text: string;
  jawaban_gambar?: string;
  skor: number;
  soal: Soal;
};

type Peserta = {
  id: number;
  nama: string;
  umur: number;
  tanggal_lahir: string;
  jenis_kelamin: string;
  tingkat_pendidikan: string;
  instansi: string;
  posisi: string;
  kontak: string;
  domisili: string;
  kendaraan: string;
  kesibukan: string;
  portofolio: string;
  jawaban: Jawaban[];
};

export default function AdminPage() {
  const [pesertaList, setPesertaList] = useState<Peserta[]>([]);
  const [selectedPeserta, setSelectedPeserta] = useState<Peserta | null>(null);
  const [jawaban, setJawaban] = useState<Jawaban[]>([]);
  const [scrollPos, setScrollPos] = useState(0);

  // ambil semua peserta
useEffect(() => {
  fetch("/api/admin/peserta", {
    cache: "no-store",
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        console.error("API error:", text);
        throw new Error("Gagal fetch peserta");
      }
      return res.json();
    })
    .then((data) => {
      console.log("DATA PESERTA:", data); // debug
      setPesertaList(data);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}, []);


  // pilih peserta
  const handleSelectPeserta = async (id: number) => {
  try {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      theme: "dark"
    });

    await loadPeserta(id);

    Swal.close();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Gagal mengambil data peserta",
      theme: "dark"
    });
  }
};


const loadPeserta = async (id: number) => {
  const res = await fetch(`/api/admin/peserta/${id}`);
  const data = await res.json();

  const sortedJawaban = data.jawaban.sort(
    (a: Jawaban, b: Jawaban) => a.id - b.id
  );

  setSelectedPeserta(data);
  setJawaban(sortedJawaban);
};

useEffect(() => {
  if (jawaban.length === 0) return;

  const updatedJawaban = jawaban.map((j) => {
    // jika soal pilihan → auto nilai
    if (j.soal.tipe === "PILIHAN") {
      const benar =
        j.jawaban_text?.trim().toLowerCase() ===
        j.soal.kunci_jawaban?.trim().toLowerCase();

      return {
        ...j,
        skor: benar ? 1 : 0,
      };
    }

    // jika UPLOAD (gambar) → biarkan manual
    return j;
  });

  setJawaban(updatedJawaban);
}, [selectedPeserta]);



  // ubah skor
  const handleSkorChange = (id: number, skor: number) => {
    setJawaban(prev =>
      prev.map(j =>
        j.id === id ? { ...j, skor } : j
      )
    );
  };

  // simpan semua skor
 const simpanSemuaSkor = async () => {
  const currentScroll = window.scrollY;

  Swal.fire({
    title: "Menyimpan skor...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    theme: "dark"
  });

  try {
    for (const j of jawaban) {
      const res = await fetch("/api/admin/update-skor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jawabanId: j.id,
          skor: j.skor,
        }),
      });

      if (!res.ok) throw new Error("Gagal update skor");
    }

    if (selectedPeserta?.id) {
      await loadPeserta(selectedPeserta.id);
    }

    Swal.close();

    await Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Semua skor berhasil disimpan!",
      theme: "dark"
    });

    window.scrollTo({
      top: currentScroll,
      behavior: "instant",
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Terjadi error saat menyimpan skor",
      theme: "dark"
    });
  }
};



const totalSoal = jawaban.length;

const totalSkor = jawaban.reduce((total, j) => {
  return total + (Number(j.skor) || 0);
}, 0);

const nilaiAkhir = ((totalSkor / totalSoal) * 100).toFixed(2);

 return (
  <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-white">
        Admin Penilaian Psikotes
      </h1>

      {/* pilih peserta */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-white">
          Pilih Peserta
        </label>
        <select
          className="w-full md:w-1/2 border rounded-lg p-3 focus:ring focus:ring-blue-200 bg-[var(--background)] text-[var(--foreground)]"
          onChange={(e) => handleSelectPeserta(Number(e.target.value))}
        >
          <option value="">-- Pilih Peserta --</option>
          {pesertaList.map(p => (
            <option key={p.id} value={p.id}>{p.nama} ({p.posisi})</option>
          ))}
        </select>
      </div>

      {/* identitas peserta */}
      {selectedPeserta && (
        <div className="bg-neutral-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-600">
            Identitas Peserta
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Nama</span>
            <span>:</span>
            <span>{selectedPeserta.nama}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Umur</span>
            <span>:</span>
            <span>{selectedPeserta.umur}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Posisi</span>
            <span>:</span>
            <span>{selectedPeserta.posisi}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Tanggal Lahir</span>
            <span>:</span>
            <span>
              {new Date(selectedPeserta.tanggal_lahir).toLocaleDateString("id-ID")}
            </span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Jenis Kelamin</span>
            <span>:</span>
            <span>{selectedPeserta.jenis_kelamin}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Pendidikan</span>
            <span>:</span>
            <span>{selectedPeserta.tingkat_pendidikan}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Instansi</span>
            <span>:</span>
            <span>{selectedPeserta.instansi}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Kontak</span>
            <span>:</span>
            <span>{selectedPeserta.kontak}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Domisili</span>
            <span>:</span>
            <span>{selectedPeserta.domisili}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Kendaraan Pribadi</span>
            <span>:</span>
            <span>{selectedPeserta.kendaraan}</span>
          </div>

          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Kegiatan saat ini</span>
            <span>:</span>
            <span>{selectedPeserta.kesibukan}</span>
          </div>

          {selectedPeserta.portofolio && (
          <div className="grid grid-cols-[150px_10px_1fr]">
            <span className="font-bold">Portofolio</span>
            <span>:</span>
            <a
              href={selectedPeserta.portofolio}
              target="_blank"
              className="text-blue-300 underline"
            >
              Lihat Portofolio
            </a>
          </div>
        )}

      </div>

        </div>
      )}

      {/* tabel jawaban */}
      {jawaban.length > 0 && (
        <div className="bg-neutral-800 shadow rounded-lg p-4">

          <table className="w-full border-b border-neutral-700 bg-neutral-600">
            <thead>
              <tr className="bg-neutral-700 text-white">
                <th className="p-3 border-collapse">No</th>
                <th className="p-3 border-collapse">Pertanyaan</th>
                <th className="p-3 border-collapse">Jawaban Peserta</th>
                <th className="p-3 border-collapse">Kunci Jawaban</th>
                <th className="p-3 border-collapse">Skor</th>
              </tr>
            </thead>
            <tbody>
              {jawaban.map((j, index) => (
                <tr
                  key={j.id}
                  className="odd:bg-neutral-600 hover:bg-neutral-500 transition"
                >
                  <td className="p-3 border-b border-neutral-700 text-center text-white">{index + 1}</td>
                  <td className="border-b border-neutral-700">
                  <div className="space-y-2 mt-2 mb-2">
                    {/* Pertanyaan */}
                    <p className="font-semibold">{j.soal.pertanyaan}</p>

                    {/* Gambar soal */}
                    {j.soal.gambar && (
                    <img
                      src={j.soal.gambar}
                      alt="Gambar Soal"
                      className="mt-2 w-40 rounded shadow"
                      onError={(e) => console.log("Gambar error:", j.soal.gambar)}
                    />
                  )}

              {/* Pilihan jawaban */}
              {j.soal.tipe === "PILIHAN" && j.soal.pilihan?.length > 0 && (
              <ul className="mt-2 space-y-1">
                {j.soal.pilihan.map((p) => (
              <li
                key={p.id}
                className="px-2 py-1 rounded text-white"
              >
                {p.label}. {p.teks}
              </li>

            ))}
          </ul>
        )}
        </div>
        </td>


        <td className="p-3 border-b border-neutral-700">
          {j.soal.tipe === "UPLOAD" ? (
          j.jawaban_gambar ? (
        <div className="flex flex-col gap-2">
          {/* Tampilkan gambar */}
        <img
          src={j.jawaban_gambar}
          alt="Jawaban Gambar"
          className="w-40 rounded shadow"
        />
          {/* Link download */}
          <a
            href={j.jawaban_gambar}
            target="_blank"
            download
            className="text-blue-600 underline"
          >
            Lihat Jawaban
          </a>
        </div>
        ) : (
        <span className="text-red-500">Tidak ada gambar</span>
        )
      ) : (
      j.jawaban_text
      )}
    </td>
    <td className="p-3 border-b border-neutral-700">
  {j.soal.kunci_jawaban ? (
    <p className="font-semibold text-green-500">
      {j.soal.kunci_jawaban}
    </p>
  ) : (
    <span className="text-gray-400">Belum ada kunci jawaban</span>
  )}
</td>
                  <td className="p-3 border-b border-neutral-700 text-center">
                    <input
                      type="number"
                      min={0}
                      max={1}
                      value={Number(j.skor) || 0}
                      disabled={j.soal.tipe === "PILIHAN"}
                      onChange={(e) =>
                      handleSkorChange(j.id, Number(e.target.value))
                    }
                      className="border rounded px-2 py-1 w-20 text-center"
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* total skor */}
          <div className="flex justify-between items-center mt-6">
           <div className="bg-green-100 text-green-800 px-5 py-3 rounded-lg text-lg font-bold shadow">
            Total Skor: <span className="text-2xl">{nilaiAkhir}%</span>
            </div>


            <button
              onClick={simpanSemuaSkor}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold shadow"
            >
              Simpan Semua Skor
            </button>
          </div>

        </div>
      )}

    </div>
  </div>
);

}
