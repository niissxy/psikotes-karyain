// "use client";

// import { useEffect, useState } from "react";

// type KunciJawaban = {
//   id: number;
//   label: string;      // A
//   teks: string;       // Terang
//   penjelasan?: string | null;
// };

// type Soal = {
//   id: number;
//   pertanyaan: string;
//   kunci_jawaban: KunciJawaban[];
//   pilihan: { id: number; label: string; teks?: string }[];
// };

// export default function KunciJawabanPage() {
//   const [data, setData] = useState<Soal[]>([]);

//   useEffect(() => {
//   fetch("/api/admin/kunci-jawaban")
//     .then(async (res) => {
//       if (!res.ok) {
//         const text = await res.text();
//         console.error("API Error:", text);
//         return;
//       }
//       return res.json();
//     })
//     .then((data) => {
//       if (data) setData(data);
//     });
// }, []);


//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl font-bold mb-6 text-gray-800">
//           Kunci Jawaban Psikotes
//         </h1>

//         {data.map((soal, index) => (
//   <div key={soal.id} className="bg-white shadow rounded-lg p-5 mb-5">

//     {/* Pertanyaan */}
//     <h2 className="font-semibold text-lg mb-2">
//       {index + 1}. {soal.pertanyaan}
//     </h2>

//     {/* Pilihan */}
//     <ul className="ml-4 mb-3 space-y-1">
//       {soal.pilihan.map((p) => (
//         <li key={p.id} className="text-gray-700">
//           {p.label}. {p.teks}
//         </li>
//       ))}
//     </ul>

//     {/* Kunci Jawaban */}
//     {soal.kunci_jawaban.length > 0 && (
//       <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded">
//         <p className="font-semibold text-green-700">
//           Kunci Jawaban:
//         </p>

//         {soal.kunci_jawaban.map((k) => (
//           <div key={k.id} className="ml-3">
//             <p className="text-green-800 font-medium">
//               {k.label}. {k.teks}
//             </p>

//             {k.penjelasan && (
//               <p className="text-sm text-gray-600 mt-1">
//                 Penjelasan: {k.penjelasan}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     )}

//   </div>
// ))}


//       </div>
//     </div>
//   );
// }
