"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      // Ambil session untuk cek role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user.role === "ADMIN") router.push("/admin");
      else router.push("/soal");
    } else {
      alert("Email atau password salah!");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-black">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
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
          Belum punya akun? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </div>
    </div>
  );
}
