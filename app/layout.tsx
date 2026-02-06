import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Psikotes Karyain",
  description: "Form psikotes karyain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={montserrat.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
