"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitlogStore } from "@/store/useFitlogStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const { todaysPlan, savedWorkouts } = useFitlogStore();

  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const planCount = isMounted ? todaysPlan.length : 0;
  const savedCount = isMounted ? savedWorkouts.length : 0;

  // Close mobile menu when navigating
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[var(--color-dark)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          
   
          <div className="flex items-center gap-3">
            
            <button
              type="button"
              className="sm:hidden flex items-center justify-center text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 group"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
                <Image
                  src="/assets/logo.png"
                  alt="FitLog Logo"
                  fill
                  sizes="(max-width: 768px) 28px, 32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-display text-xl font-bold tracking-wide text-white sm:text-2xl mt-0.5">
                FITLOG
              </span>
            </Link>
          </div>

     
          <div className="hidden items-center gap-1 rounded-full border border-gray-800 bg-gray-900/50 p-1 sm:flex">
            <Link
              href="/"
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                pathname === "/my-plan"
                  ? "bg-gray-800 text-[var(--color-brand)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

        
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-xs text-gray-300 transition-colors hover:text-white sm:text-sm"
            >
              Plan
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-black">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 text-xs text-gray-300 transition-colors hover:text-white sm:text-sm"
            >
              Saved
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  savedCount > 0
                    ? "border border-gray-500 text-gray-200"
                    : "border border-gray-600 text-gray-400"
                }`}
              >
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

     
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-[72px] w-48 rounded-br-xl border-b border-r border-gray-800 bg-[#16181D] shadow-xl sm:hidden">
          <div className="flex flex-col py-2">
            <Link
              href="/"
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-white bg-gray-800/50"
                  : "text-gray-300 hover:bg-gray-800/30 hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                pathname === "/my-plan"
                  ? "text-[var(--color-brand)] bg-gray-800/50"
                  : "text-gray-300 hover:bg-gray-800/30 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}