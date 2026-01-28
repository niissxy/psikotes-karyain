"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
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
    // Ambil session untuk role
    const session = await getSession();
    if (session?.user.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/soal");
    }
  } else {
    alert("Email atau password salah!");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-black">
      <div className="bg-white p-6 rounded-lg shadow-md w-[320px] h-[420px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
        >
          Login
        </button>

        <hr className="my-3" />

        <button
          onClick={() => signIn("google", { callbackUrl: "/soal" })}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Login with Google
        </button>

        <p className="text-center text-sm mt-2">Belum punya akun?
            <a href="/register" className="text-blue-600 underline"> Register</a>
        </p>
      </div>
    </div>
  );
}
