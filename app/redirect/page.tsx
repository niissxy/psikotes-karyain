import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

    return <p>Redirecting...</p>
}