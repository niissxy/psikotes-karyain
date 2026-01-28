"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-black">
      <div className="bg-white p-6 rounded-lg shadow-md w-[320px] h-[420px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
        >
          Register
        </button>

        <hr className="my-3" />

        <button
          onClick={() => signIn("google", { callbackUrl: "/soal" })}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Login with Google
        </button>
        <p className="text-center text-sm mt-2">Sudah punya akun?
            <a href="/login" className="text-blue-600 underline"> Login</a>
        </p>
      </div>
    </div>
  );
}
