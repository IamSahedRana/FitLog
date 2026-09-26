"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PlanCard from "@/components/cards/PlanCard";
import { useFitlogStore } from "@/store/useFitlogStore";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const { todaysPlan, savedWorkouts } = useFitlogStore();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  
  // New state for custom dropdown
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  const currentWorkouts = useMemo(() => {
    const workouts = activeTab === "plan" ? [...todaysPlan] : [...savedWorkouts];

    workouts.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });

    return workouts;
  }, [activeTab, todaysPlan, savedWorkouts, sortBy]);

  const totalMinutes = todaysPlan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = todaysPlan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  if (!isMounted) {
    return (
      <main className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 lg:py-12">
        <div className="h-8 w-40 animate-pulse rounded bg-gray-800" />
        <div className="mt-3 h-5 w-80 animate-pulse rounded bg-gray-800" />
        <div className="mt-9 h-28 animate-pulse rounded-2xl bg-[#191c22]" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 lg:py-12">
      <section>
        <h1 className="font-display text-4xl font-medium uppercase tracking-tight text-white sm:text-5xl">
          My Plan
        </h1>
        <p className="mt-2 text-base text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      <section className="mt-9 overflow-hidden rounded-2xl border border-gray-800 bg-[#191c22]">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {/* Exercises */}
          <div className="border-b border-gray-800 px-6 py-5 sm:border-b-0 sm:border-r">
            <p className="text-sm text-gray-400">Exercises</p>
            <p className="mt-1 text-3xl font-bold text-[var(--color-brand)]">
              {todaysPlan.length}
            </p>
          </div>

          <div className="border-b border-gray-800 px-6 py-5 sm:border-b-0 sm:border-r">
            <p className="text-sm text-gray-400">Minutes</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {totalMinutes}
            </p>
          </div>

          <div className="px-6 py-5">
            <p className="text-sm text-gray-400">Calories</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {totalCalories}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        
        {/* Tabs */}
        <div className="inline-flex w-fit rounded-2xl bg-[#191c22] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "plan"
                ? "bg-[#111318] text-[var(--color-brand)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "saved"
                ? "bg-[#111318] text-[var(--color-brand)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Custom Sort Dropdown */}
        <div className="relative w-full sm:w-[325px]">
          <label className="mb-1.5 block text-sm text-gray-300">
            Sort By
          </label>
          
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`flex h-12 w-full items-center justify-between rounded-xl border bg-transparent px-4 text-sm text-gray-200 outline-none transition-colors ${
              isSortOpen ? "border-[var(--color-brand)]" : "border-gray-700 hover:border-gray-500"
            }`}
          >
            <span>{SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label}</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isSortOpen && (
            <>
              {/* Invisible overlay to close dropdown on click outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-gray-700 bg-[#16181D] py-1 shadow-xl">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-800 ${
                      sortBy === option.value
                        ? "text-[var(--color-brand)] bg-gray-800/30"
                        : "text-gray-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        {currentWorkouts.length > 0 ? (
          currentWorkouts.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              showDoneButton={activeTab === "plan"}
              savedView={activeTab === "saved"}
            />
          ))
        ) : (
          <EmptyState activeTab={activeTab} />
        )}
      </section>
    </main>
  );
}

function EmptyState({ activeTab }: { activeTab: Tab }) {
  return (
    <div className="flex min-h-[205px] flex-col items-center justify-center rounded-2xl border border-gray-800 bg-[#191c22] px-6 text-center">
      <h2 className="font-display text-xl font-bold uppercase text-white">
        {activeTab === "plan" ? "Nothing here yet" : "No saved workouts"}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
        {activeTab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save workouts from the library and they will appear here."}
      </p>
      {activeTab === "plan" && (
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[var(--color-brand)] px-5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          Go to workouts
        </Link>
      )}
    </div>
  );
}