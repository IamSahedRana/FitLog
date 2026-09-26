import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ToastProvider from "@/components/shared/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} font-sans min-h-screen flex flex-col bg-[var(--color-dark)] text-white`}
        suppressHydrationWarning
      >
        <Navbar />

<main className="flex-grow">
  {children}
</main>

<Footer />

<ToastProvider />
      </body>
    </html>
  );
}