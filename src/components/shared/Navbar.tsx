"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useFitlogStore } from "@/store/useFitlogStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedWorkouts } = useFitlogStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="border-b border-gray-800 bg-[var(--color-dark)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-[var(--color-brand)] transform -rotate-45" />
            <span className="font-display text-2xl font-bold tracking-wider text-white">FITLOG</span>
          </Link>

          {/* Middle: Links */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-900/50 p-1 rounded-full border border-gray-800">
            <Link
              href="/"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === "/" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                pathname === "/my-plan" ? "bg-gray-800 text-[var(--color-brand)]" : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Right: Badges */}
          <div className="flex items-center gap-6">
            <Link href="/my-plan" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              Plan
              <span className="bg-[var(--color-brand)] text-black font-bold h-6 w-6 rounded-full flex items-center justify-center text-xs">
                {isMounted ? todaysPlan.length : 0}
              </span>
            </Link>
            <Link href="/my-plan" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              Saved
              <span className="border border-gray-600 text-gray-300 font-bold h-6 w-6 rounded-full flex items-center justify-center text-xs">
                {isMounted ? savedWorkouts.length : 0}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}