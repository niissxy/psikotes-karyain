"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      theme: "dark"
    });

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    Swal.close();

    if (res?.ok) {
      // Ambil session untuk cek role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      await Swal.fire({
        icon: "success",
        title: "Login berhasil!",
        showConfirmButton: false,
        text: "Anda akan diarahkan dalam 3 detik",
        timer: 3000,
        theme: "dark"
      });

      if (session?.user.role === "ADMIN") router.push("/admin");
      else router.push("/soal");
    } else {
      // alert("Email atau password salah!");
      Swal.fire({
        icon: "error",
        title: "Email atau password salah",
        theme: "dark"
      });
    }
  };

  const handleGoogleLogin = async () => {
    // Gunakan redirect: false supaya kita bisa ambil role
    const res = await signIn("google", { redirect: false });

    if (res?.url) {
      // Setelah login Google berhasil, ambil session
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user.role === "ADMIN") router.push("/admin");
      else router.push("/soal");
    } else {
      alert("Login Google gagal!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-700 to-black">
      <div className="bg-neutral-800 text-[var(--foreground)] p-6 rounded shadow-md w-[320px]">

        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            unoptimized
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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
            className="w-full px-3 py-2 pr-10 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 inset-y-0 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? (
            <EyeIcon className="w-5 h-5" />
              ) : (
            <EyeSlashIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded mb-3 mt-3 hover:bg-blue-600 cursor-pointer"
        >
          Login
        </button>

        {/* <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 rounded mb-3"
        >
          Login dengan Google
        </button> */}

        <p className="text-center text-sm">
          Belum punya akun? <a href="/register" className="text-blue-400">Register</a>
        </p>
      </div>
    </div>
  );
}