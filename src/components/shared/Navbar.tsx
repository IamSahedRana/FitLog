"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitlogStore } from "@/store/useFitlogStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const { todaysPlan, savedWorkouts } =
    useFitlogStore();

  const [isMounted, setIsMounted] =
    useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const planCount = isMounted
    ? todaysPlan.length
    : 0;

  const savedCount = isMounted
    ? savedWorkouts.length
    : 0;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[var(--color-dark)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
              priority
            />

            <span className="font-display text-xl font-bold tracking-wide text-white sm:text-2xl">
              FITLOG
            </span>
          </Link>

          {/* Navigation */}
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

          {/* Counters */}
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
    </nav>
  );
}