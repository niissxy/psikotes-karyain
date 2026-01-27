"use client";

import { useEffect, useState } from "react";

type Soal = {
    id: number;
    pertanyaan: string;
};

type Jawaban = {
    id: number;
    jawaban_text: string;
    skor: number;
    soal: Soal;
}

type Peserta = {
    id: number;
    nama: string;
    umur: number;
    tanggal_lahir: string;
    jenis_kelamin: string;
    tingkat_pendidikan: string;
    instansi: string;
    kontak: string;
    hasil: {
        skor: number;
    } | null;
    jawaban: Jawaban[];
}

export default function AdminPage() {
    const [data, setData] = useState<Peserta[]>([]);

    useEffect(() => {
        fetch("api/admin/jawaban")
        .then((res) => res.json())
        .then((data: Peserta[]) => setData(data))
        .catch((err) => console.error(err));
    }, []);

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Data Jawaban Peserta</h1>

            {data.map((peserta) => (
                <div key={peserta.id} className="border rounded p-4 mb-6">
                    <h2 className="font-bold text-lg">{peserta.nama}</h2>
                    <p>Umur: {peserta.umur}</p>
                    <p>Tanggal Lahir: {" "} {new Date(peserta.tanggal_lahir). toLocaleDateString("id-ID")}</p>
                    <p>Jenis Kelamin: {peserta.jenis_kelamin}</p>
                    <p>Tingkat Pendidikan: {peserta.tingkat_pendidikan}</p>
                    <p>Instansi: {peserta.instansi}</p>
                    <p>Kontak: {peserta.kontak}</p>
                    <p className="font-semibold">Skor: {peserta.hasil?.skor ?? 0}</p>

                    <hr className="my-3"/>

                    <h3 className="font-semibold mb-2">Jawaban:</h3>
                    {peserta.jawaban.map((j, i) => (
                        <div key={j.id} className="mb-2">
                            <p className="font-medium">
                                {i + 1}. {j.soal.pertanyaan}
                            </p>
                            <p className="ml-4 text-gray-700">
                                Jawaban: {j.jawaban_text}
                            </p>
                            <p className="ml-4 text-sm">Skor: {j.skor}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function then(arg0: (data: Peserta[]) => void) {
    throw new Error("Function not implemented.");
}
