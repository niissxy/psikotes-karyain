"use client";

import { useEffect, useState } from "react";

type Soal = {
  id: number;
  pertanyaan: string;
};

const jenisKelaminOption = [
  { value: "LAKI_LAKI", label: "Laki-Laki" },
  { value: "PEREMPUAN", label: "Perempuan" }
]

export default function Home() {
  const [soals, setSoals] = useState<Soal[]>([]);
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("")
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [tingkat_pendidikan, setTingkatPendidikan] = useState("");
  const [instansi, setInstansi] = useState("");
  const [kontak, setKontak] = useState("");
  const [jawaban, setJawaban] = useState<Record<number, string>>({});
  const [step, setStep] = useState<"identitas" | "soal">("identitas");

  // Ambil soal dari API
  useEffect(() => {
    fetch("/api/soal")
      .then((res) => res.json())
      .then((data: Soal[]) => setSoals(data));
  }, []);

  // Validasi identitas
  const startTest = () => {
    if (!nama.trim() || !umur.trim() || !tanggal_lahir.trim() || !jenis_kelamin.trim() || !tingkat_pendidikan.trim() || !instansi.trim() || !kontak.trim()) {
      alert("Harap isi identitas terlebih dahulu!");
      return;
    }
    setStep("soal");
  };

  // Submit jawaban
  const submitTest = async () => {

    if (Object.keys(jawaban).length === 0){
      alert("Harap isi jawaban terlebih dahulu!");
      return;
    }

    const data = {
      nama,
      umur: Number(umur),
      tanggal_lahir: tanggal_lahir,
      jenis_kelamin: jenis_kelamin,
      tingkat_pendidikan: tingkat_pendidikan,
      instansi: instansi,
      kontak: kontak,
      jawaban: Object.keys(jawaban).map((id) => ({
        soalId: Number(id),
        skor: jawaban[Number(id)],
      })),
    };

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      alert("Terjadi error saat submit");
      return;
    }

    const hasil = await res.json();
    alert("Skor: " + hasil.skor);

    // Reset form atau arahkan ke halaman lain
    setStep("identitas");
    setNama("");
    setUmur("");
    setTanggalLahir("");
    setJenisKelamin("");
    setTingkatPendidikan("");
    setInstansi("");
    setKontak("");
    setJawaban({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        {step === "identitas" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Identitas Peserta</h2>

            <div className="mb-2">
              <p>Nama Lengkap</p>
            <input
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            </div>
      
            <div className="mb-2">
              <p>Umur</p>
            <input
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              type="number"
              placeholder="Umur"
              value={umur}
              onChange={(e) => setUmur(e.target.value)}
            />
            </div>

            <div className="mb-2">
              <p>Tanggal Lahir</p>
            <input 
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              type="date"
              placeholder="Tanggal Lahir"
              value={tanggal_lahir}
              onChange={(e) => setTanggalLahir(e.target.value)} 
            />
            </div>

            <div className="mb-2">
              <p>Jenis Kelamin</p>
              <select
                value={jenis_kelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
              <option value="">Pilih Jenis Kelamin</option>
                {jenisKelaminOption.map((j) => (
              <option key={j.value} value={j.value}>
                {j.label}
              </option>
              ))}
              </select>
            </div>

            <div className="mb-2">
              <p>Tingkat Pendidikan</p>
              <input
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md" 
                type="text"
                placeholder="Tingkat Pendidikan"
                value={tingkat_pendidikan}
                onChange={(e) => setTingkatPendidikan(e.target.value)} 
              />
            </div>

            <div className="mb-2">
              <p>Instansi</p>
              <input
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md" 
                type="text" 
                placeholder="Instansi"
                value={instansi}
                onChange={(e) => setInstansi(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <p>Kontak</p>
              <input
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md" 
                type="text" 
                placeholder="Kontak"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
              />
            </div>
            <button
              onClick={startTest}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Mulai Tes
            </button>
          </>
        )}

        {step === "soal" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Psikotes</h2>
            {soals.map((s, index) => (
              <div key={s.id} className="mb-4">
                <p className="font-semibold">
                  {index + 1}. {s.pertanyaan}
                </p>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  placeholder="Jawaban..."
                  value={jawaban[s.id] || ""}
                  onChange={(e) =>
                    setJawaban((prev) => ({ ...prev, [s.id]: e.target.value }))
                  }
                />
              </div>
            ))}
            <button
              onClick={submitTest}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Jawaban
            </button>
          </>
        )}
      </div>
    </div>
  );
}
