"use client";

import { Workout } from "@/types";
import { useFitlogStore } from "@/store/useFitlogStore";
import { Bookmark, CalendarPlus } from "lucide-react";

export default function ActionButtons({
  workout,
}: {
  workout: Workout;
}) {
  const {
    addToPlan,
    toggleSaveWorkout,
    savedWorkouts,
    todaysPlan,
  } = useFitlogStore();

  const isSaved = savedWorkouts.some(
    (item) => item.id === workout.id
  );

  const isInPlan = todaysPlan.some(
    (item) => item.id === workout.id
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
     
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className={`inline-flex h-[46px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all ${
          isInPlan
            ? "cursor-pointer bg-[var(--color-brand)] text-black"
            : "bg-[var(--color-brand)] text-black hover:opacity-90"
        }`}
      >
        <CalendarPlus className="h-[17px] w-[17px]" />

        {isInPlan
          ? "In today's plan"
          : "Add to today's plan"}
      </button>

  
      <button
        type="button"
        onClick={() => toggleSaveWorkout(workout)}
        className={`inline-flex h-[46px] items-center justify-center gap-2 rounded-xl border px-6 text-sm font-medium transition-all ${
          isSaved
            ? "border-[var(--color-brand)] bg-[#15181f] text-[var(--color-brand)]"
            : "border-gray-700 bg-transparent text-gray-300 hover:border-gray-500 hover:text-white"
        }`}
      >
        <Bookmark
          className={`h-[17px] w-[17px] ${
            isSaved
              ? "fill-[var(--color-brand)]"
              : ""
          }`}
        />

        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}