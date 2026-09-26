"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PlanCard from "@/components/cards/PlanCard";
import { useFitlogStore } from "@/store/useFitlogStore";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    todaysPlan,
    savedWorkouts,
  } = useFitlogStore();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentWorkouts = useMemo(() => {
    const workouts =
      activeTab === "plan"
        ? [...todaysPlan]
        : [...savedWorkouts];

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
  }, [
    activeTab,
    todaysPlan,
    savedWorkouts,
    sortBy,
  ]);

  const totalMinutes = todaysPlan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = todaysPlan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
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
          Cap of five lifts for today. Finish them,
          then load more.
        </p>
      </section>

     
      <section className="mt-9 overflow-hidden rounded-2xl border border-gray-800 bg-[#191c22]">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {/* Exercises */}
          <div className="border-b border-gray-800 px-6 py-5 sm:border-b-0 sm:border-r">
            <p className="text-sm text-gray-400">
              Exercises
            </p>

            <p className="mt-1 text-3xl font-bold text-[var(--color-brand)]">
              {todaysPlan.length}
            </p>
          </div>

       
          <div className="border-b border-gray-800 px-6 py-5 sm:border-b-0 sm:border-r">
            <p className="text-sm text-gray-400">
              Minutes
            </p>

            <p className="mt-1 text-3xl font-bold text-white">
              {totalMinutes}
            </p>
          </div>

 
          <div className="px-6 py-5">
            <p className="text-sm text-gray-400">
              Calories
            </p>

            <p className="mt-1 text-3xl font-bold text-white">
              {totalCalories}
            </p>
          </div>
        </div>
      </section>

   
      <section className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
       
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
            Today`&apos;s Plan
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

     
        <div className="w-full sm:w-[325px]">
          <label
            htmlFor="sort"
            className="mb-1.5 block text-sm text-gray-300"
          >
            Sort By
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as SortOption
              )
            }
            className="h-12 w-full rounded-xl border border-gray-700 bg-transparent px-4 text-sm text-gray-200 outline-none transition-colors focus:border-[var(--color-brand)]"
          >
            <option
              value="duration"
              className="bg-[#111318]"
            >
              Duration
            </option>

            <option
              value="calories"
              className="bg-[#111318]"
            >
              Calories
            </option>

            <option
              value="rating"
              className="bg-[#111318]"
            >
              Rating
            </option>
          </select>
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



function EmptyState({
  activeTab,
}: {
  activeTab: Tab;
}) {
  return (
    <div className="flex min-h-[205px] flex-col items-center justify-center rounded-2xl border border-gray-800 bg-[#191c22] px-6 text-center">
      <h2 className="font-display text-xl font-bold uppercase text-white">
        {activeTab === "plan"
          ? "Nothing here yet"
          : "No saved workouts"}
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