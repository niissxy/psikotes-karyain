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

  useEffect(() => {
    fetch("/api/soal")
      .then((res) => res.json())
      .then((data: Soal[]) => setSoals(data));
  }, []);

  const submitTest = async () => {
    const data = {
      nama,
      umur: Number(umur),
      jawaban: Object.keys(jawaban).map(id => ({
      soalId: Number(id),
      skor: jawaban[Number(id)]
    })),

    };

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  };

  return (
    <div className="container">
      <h2>Psikotes</h2>

      <input
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <input
        type="number"
        placeholder="Umur"
        value={umur}
        onChange={(e) => setUmur(e.target.value)}
      />

      {soals.map((s) => (
        <div key={s.id} style={{ marginBottom: 20 }}>
          <p><b>{s.pertanyaan}</b></p>

          <input
            type="text"
            placeholder="Jawaban..."
            value={jawaban[s.id] || ""}
            onChange={(e) =>
              setJawaban((prev) => ({
                ...prev,
                [s.id]: e.target.value,
              }))
            }
          />
        </div>
      ))}

      <button onClick={submitTest}>Submit</button>
    </div>
  );
}
