"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user.role === "ADMIN") {
      router.push("/admin");
    } else if (session?.user.role === "USER") {
      router.push("/soal");
    }
  }, [session, status, router]);

  return <p>Redirecting...</p>;
}
