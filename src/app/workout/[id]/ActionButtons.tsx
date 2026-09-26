"use client";

import { Workout } from "@/types";
import { useFitlogStore } from "@/store/useFitlogStore";
import { Bookmark, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function ActionButtons({ workout }: { workout: Workout }) {
  const { addToPlan, toggleSaveWorkout, savedWorkouts, todaysPlan } = useFitlogStore();

  const isSaved = savedWorkouts.some((w) => w.id === workout.id);
  const isInPlan = todaysPlan.some((w) => w.id === workout.id);

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.info("This workout is already in your plan!");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan!");
  };

  const handleToggleSave = () => {
    toggleSaveWorkout(workout);
    if (isSaved) {
      toast.info("Removed from saved workouts.");
    } else {
      toast.success("Workout saved successfully!");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
      <button
        onClick={handleAddToPlan}
        className="w-full sm:flex-1 bg-[var(--color-brand)] text-black font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-[#b3e600] transition-colors shadow-lg"
      >
        <Plus className="w-5 h-5" />
        {isInPlan ? "In Today's Plan" : "Add to Plan"}
      </button>

      <button
        onClick={handleToggleSave}
        className={`w-full sm:w-auto border border-gray-700 py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 transition-colors ${
          isSaved ? "bg-gray-800 text-[var(--color-brand)]" : "text-gray-300 hover:text-white hover:border-gray-500"
        }`}
      >
        <Bookmark className={`w-5 h-5 ${isSaved ? "fill-[var(--color-brand)]" : ""}`} />
        {isSaved ? "Saved" : "Save Workout"}
      </button>
    </div>
  );
}