"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Soal = {
  id: number;
  pertanyaan: string;
  tipe: "PILIHAN" | "UPLOAD";
  gambar?: string | null;
  pilihan: { id: number; label: string; teks?: string }[];
};

type Pilihan = {
  id: number;
  label: string;
  teks: string;
};


const jenisKelaminOption = [
  { value: "LAKI_LAKI", label: "Laki-Laki" },
  { value: "PEREMPUAN", label: "Perempuan" }
]

export default function SoalPage() {
  const [soals, setSoals] = useState<Soal[]>([]);
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("")
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [tingkat_pendidikan, setTingkatPendidikan] = useState("");
  const [instansi, setInstansi] = useState("");
  const [posisi, setPosisi] = useState("");
  const [kontak, setKontak] = useState("");
  const [portofolio, setPortofolio] = useState<File | null>(null);
  const [jawaban, setJawaban] = useState<Record<number, string>>({});
  const [step, setStep] = useState<"identitas" | "soal">("identitas");

  const [jawabanFile, setJawabanFile] = useState<Record<number, File>>({});

  // const TOTAL_TIME = 25 * 60; // 25 menit (detik)
  // const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // const menit = Math.floor(timeLeft / 60);
  // const detik = timeLeft % 60;


// useEffect(() => {
//   if (step !== "soal") return;

//   const savedEndTime = localStorage.getItem("endTime");
//   let endTime: number;

//   if (!savedEndTime) {
//     endTime = Date.now() + TOTAL_TIME * 1000;
//     localStorage.setItem("endTime", endTime.toString());
//   } else {
//     endTime = Number(savedEndTime);
//   }

//   const remaining = Math.floor((endTime - Date.now()) / 1000);

//   if (remaining <= 0) {
//     setTimeLeft(0);
//     handleAutoSubmit();
//   } else {
//     setTimeLeft(remaining);
//   }
// }, [step]);

// const handleAutoSubmit = async () => {
//   if (isSubmitted) return;

//   setIsSubmitted(true);
//   localStorage.removeItem("endTime");

//   await Swal.fire({
//     icon: "warning",
//     title: "Waktu Habis!",
//     text: "Jawaban otomatis dikumpulkan",
//     allowOutsideClick: false,
//   });

//   submitTest();
// };

  // Ambil soal dari API
  useEffect(() => {
  fetch("/api/soal")
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA SOAL:", data);
      setSoals(data);
    });
}, []);

  // Validasi identitas
  const startTest = () => {
    if (!nama.trim() || 
        !umur.trim() || 
        !tanggal_lahir.trim() || 
        !jenis_kelamin.trim() || 
        !tingkat_pendidikan.trim() || 
        !instansi.trim() || 
        !posisi.trim() || 
        !kontak.trim()) {
      Swal.fire ({
        icon: "warning",
        title: "Data belum lengkap",
        text: "Harap isi identitas terlebih dahulu",
      });
      return;
    }
    setStep("soal");
  };

  // Submit jawaban
  const submitTest = async () => {
  try {
    if (Object.keys(jawaban).length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Jawaban belum lengkap",
        text: "Harap isi jawaban terlebih dahulu",
        confirmButtonText: "OK",
      })
      return;
    }

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("umur", umur);
    formData.append("tanggal_lahir", tanggal_lahir);
    formData.append("jenis_kelamin", jenis_kelamin);
    formData.append("tingkat_pendidikan", tingkat_pendidikan);
    formData.append("instansi", instansi);
    formData.append("posisi", posisi);
    formData.append("kontak", kontak);

    formData.append(
      "jawaban",
      JSON.stringify(
        Object.keys(jawaban).map((id) => ({
          soalId: Number(id),
          jawaban: jawaban[Number(id)],
        }))
      )
    );

    if (portofolio) {
      formData.append("portofolio", portofolio);
    }

    Object.entries(jawabanFile).forEach(([soalId, file]) => {
      formData.append(`file_${soalId}`, file);
    });

    Swal.fire({
      title: "Mengirim jawaban...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const hasil = await res.json();
    Swal.close();

    if (hasil.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Jawaban berhasil disimpan",
        confirmButtonText: "OK",
      });

      setStep("identitas");
      setNama("");
      setUmur("");
      setTanggalLahir("");
      setJenisKelamin("");
      setTingkatPendidikan("");
      setInstansi("");
      setPosisi("");
      setKontak("");
      setJawaban({});
      setPortofolio(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menyimpan jawaban",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Terjadi kesalahan saat submit jawaban",
    });
  }
};


  return (
    
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        {step === "identitas" && (
          <>
          <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Identitas Peserta</h2>
          </div>
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
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
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
              <p>Posisi</p>
              <input
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md" 
                type="text" 
                placeholder="Posisi"
                value={posisi}
                onChange={(e) => setPosisi(e.target.value)}
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
            <div className="mb-2">
              <p>Portofolio (max 10 MB)</p>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => setPortofolio(e.target.files?.[0] || null)}
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
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
        {/* <p className="text-red-600 font-bold mb-2">
          Sisa waktu: {menit}:{detik.toString().padStart(2,"0")}
        </p> */}
        <h2 className="text-2xl font-bold text-start mb-4">Soal Psikotes</h2>

          {soals.map((s, index) => (
            
            <div key={s.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              
              <h3 className="font-semibold text-yellow-700 mb-2">
                Pertanyaan {index + 1}
              </h3>

              <p className="text-gray-800 mb-3">{s.pertanyaan}</p>

              {s.gambar && (
                <img
                  src={s.gambar}
                  alt="gambar soal"
                  className="mb-3 max-w-full rounded"
                />
              )}

              {/* ===== TIPE PILIHAN ===== */}
              {s.tipe === "PILIHAN" && (
                <div className="space-y-2">
                  {s.pilihan.map((p) => (
                    <label key={p.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`soal-${s.id}`}
                        value={p.label}
                        checked={jawaban[s.id] === p.label}
                        onChange={(e) =>
                          setJawaban({ ...jawaban, [s.id]: e.target.value })
                        }
                      />
                      <span>
                        {p.label}. {p.teks ?? ""}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* ===== TIPE UPLOAD ===== */}
              {s.tipe === "UPLOAD" && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    // simpan file
                    setJawabanFile({
                    ...jawabanFile,
                    [s.id]: file,
                  });

                // simpan tanda bahwa soal ini dijawab
                setJawaban({
                ...jawaban,
                [s.id]: file.name,
              });
            }}
              className="w-full px-3 py-2 border rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload jawaban berupa gambar
            </p>
            </div>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              onClick={submitTest}
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Submit Jawaban
            </button>
          </div>
        </>
      )}

    </div>
  </div>
);
}
