"use client";

import { useEffect, useState } from "react";
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
  kontak: string;
  portofolio: string;
  jawaban: Jawaban[];
};

export default function AdminPage() {
  const [pesertaList, setPesertaList] = useState<Peserta[]>([]);
  const [selectedPeserta, setSelectedPeserta] = useState<Peserta | null>(null);
  const [jawaban, setJawaban] = useState<Jawaban[]>([]);

  useEffect(() => {
    fetch("/api/admin/peserta")
      .then(res => res.json())
      .then(setPesertaList);
  }, []);

  const handleSelectPeserta = async (id: number) => {
    Swal.fire({ title: "Loading...", didOpen: () => Swal.showLoading() });
    const res = await fetch(`/api/admin/peserta/${id}`);
    const data = await res.json();
    setSelectedPeserta(data);
    setJawaban(data.jawaban.sort((a: Jawaban, b: Jawaban) => a.id - b.id));
    Swal.close();
  };

  const handleSkorChange = (id: number, skor: number) => {
    setJawaban(prev =>
      prev.map(j => (j.id === id ? { ...j, skor } : j))
    );
  };

  const simpanSemuaSkor = async () => {
    Swal.fire({ title: "Menyimpan skor...", didOpen: () => Swal.showLoading() });

    try {
      for (const j of jawaban) {
        await fetch("/api/admin/update-skor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jawabanId: j.id, skor: j.skor }),
        });
      }

      Swal.fire("Berhasil", "Semua skor tersimpan", "success");
    } catch {
      Swal.fire("Error", "Gagal menyimpan skor", "error");
    }
  };

  const JUMLAH_SOAL = jawaban.length;
  const skorPerSoal = JUMLAH_SOAL ? 100 / JUMLAH_SOAL : 0;
  const totalSkor = jawaban.reduce((t, j) => t + (Number(j.skor) || 0), 0);
  const nilaiAkhir = (totalSkor * skorPerSoal).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-4">Admin Penilaian</h1>

        {/* pilih peserta */}
        <select
          className="w-full md:w-1/2 border p-2 rounded mb-4"
          onChange={(e) => handleSelectPeserta(Number(e.target.value))}
        >
          <option value="">-- Pilih Peserta --</option>
          {pesertaList.map(p => (
            <option key={p.id} value={p.id}>{p.nama}</option>
          ))}
        </select>

        {/* identitas */}
        {selectedPeserta && (
          <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><b>Nama:</b> {selectedPeserta.nama}</div>
            <div><b>Umur:</b> {selectedPeserta.umur}</div>
            <div><b>Tgl Lahir:</b> {new Date(selectedPeserta.tanggal_lahir).toLocaleDateString("id-ID")}</div>
            <div><b>JK:</b> {selectedPeserta.jenis_kelamin}</div>
            <div><b>Pendidikan:</b> {selectedPeserta.tingkat_pendidikan}</div>
            <div><b>Instansi:</b> {selectedPeserta.instansi}</div>
            <div><b>Kontak:</b> {selectedPeserta.kontak}</div>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
          <table className="w-full border text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">Pertanyaan</th>
                <th className="p-2 border">Jawaban</th>
                <th className="p-2 border">Kunci</th>
                <th className="p-2 border">Skor</th>
              </tr>
            </thead>
            <tbody>
              {jawaban.map((j, i) => (
                <tr key={j.id} className="border">
                  <td className="p-2 text-center">{i + 1}</td>
                  <td className="p-2">{j.soal.pertanyaan}</td>
                  <td className="p-2">
                    {j.soal.tipe === "UPLOAD" ? (
                      j.jawaban_gambar && <img src={j.jawaban_gambar} className="w-32" />
                    ) : j.jawaban_text}
                  </td>
                  <td className="p-2 text-green-600">{j.soal.kunci_jawaban}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      value={j.skor}
                      onChange={(e) => handleSkorChange(j.id, Number(e.target.value))}
                      className="border w-16 text-center"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD */}
        <div className="block md:hidden space-y-4">
          {jawaban.map((j, i) => (
            <div key={j.id} className="bg-white p-4 rounded shadow space-y-2">
              <p className="font-bold text-yellow-600">Soal {i + 1}</p>
              <p>{j.soal.pertanyaan}</p>

              {j.soal.tipe === "UPLOAD" ? (
                j.jawaban_gambar && <img src={j.jawaban_gambar} className="w-full rounded" />
              ) : (
                <p><b>Jawaban:</b> {j.jawaban_text}</p>
              )}

              <p><b>Kunci:</b> <span className="text-green-600">{j.soal.kunci_jawaban}</span></p>

              <input
                type="number"
                value={j.skor}
                onChange={(e) => handleSkorChange(j.id, Number(e.target.value))}
                className="border w-full p-2 rounded"
              />
            </div>
          ))}
        </div>

        {/* footer */}
        {jawaban.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <div className="bg-green-100 px-4 py-2 rounded font-bold">
              Total Skor: {nilaiAkhir}
            </div>

            <button
              onClick={simpanSemuaSkor}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Simpan Semua Skor
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
