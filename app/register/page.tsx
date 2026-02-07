"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen() {
        Swal.showLoading();
      },
    })
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    Swal.close();
    
    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Register berhasil, silakan login!",
        showConfirmButton: false,
        timer: 3000,
      });
      // alert("Register berhasil, silakan login!");
      router.push("/login");
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: (data.message),
      });
      // alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-black">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">

         <div className="flex justify-center mb-4">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    unoptimized
                  />
                </div>

        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          placeholder="Nama"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full px-3 mb-3 py-2 pr-10 border rounded"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-black"
  >
    {showPassword ? (
      <EyeIcon className="w-5 h-5" />
    ) : (
      <EyeSlashIcon className="w-5 h-5" />
    )}
  </button>
</div>


        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-2 rounded mb-3 hover:bg-green-600"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Sudah punya akun? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}
