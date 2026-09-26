import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[var(--color-dark)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[68px] items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Dumbbell
              size={21}
              strokeWidth={2.5}
              className="text-[var(--color-brand)]"
            />

            <span className="font-display text-base font-bold tracking-wide text-white">
              FITLOG
            </span>
          </div>

          {/* Copyright */}
          <p className="text-right text-xs text-gray-500 sm:text-sm">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>
      </div>
    </footer>
  );
}