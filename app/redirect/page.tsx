"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function RedirectPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect (() => {
        if (!session) return;

        if(session.user.role === "ADMIN") {
            router.push("/admin");
        } else {
            router.push("/soal");
        }
    }, [session]);

    return Swal.fire({
            title: "Loading...",
            allowOutsideClick: false,
            didOpen: () => {
            Swal.showLoading();
          },
        });
}