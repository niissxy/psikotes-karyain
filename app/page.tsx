"use client";

import { useEffect, useState } from "react";

type Soal = {
  id: number;
  pertanyaan: string;
};

export default function Home() {
  const [soals, setSoals] = useState<Soal[]>([]);
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
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
    if (!nama.trim() || !umur.trim()) {
      alert("Harap isi nama dan umur terlebih dahulu!");
      return;
    }
    setStep("soal");
  };

  // Submit jawaban
  const submitTest = async () => {
    const data = {
      nama,
      umur: Number(umur),
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
    setJawaban({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        {step === "identitas" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Identitas Peserta</h2>

            <p>Nama Lengkap</p>
            <input
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            <p>Umur</p>
            <input
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
              type="number"
              placeholder="Umur"
              value={umur}
              onChange={(e) => setUmur(e.target.value)}
            />
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
