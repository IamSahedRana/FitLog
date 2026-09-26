"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
  Check,
  X,
} from "lucide-react";
import { Workout } from "@/types";
import { useFitlogStore } from "@/store/useFitlogStore";

interface PlanCardProps {
  workout: Workout;
  showDoneButton?: boolean;
  savedView?: boolean;
}

export default function PlanCard({
  workout,
  showDoneButton = false,
  savedView = false,
}: PlanCardProps) {
  const {
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitlogStore();

  const handleRemove = () => {
    if (savedView) {
      removeFromSaved(workout.id);
      return;
    }

    removeFromPlan(workout.id);
  };

  return (
    <article className="rounded-2xl border border-gray-800 bg-[#191c22] p-4 transition-colors hover:border-gray-700">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
      
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl md:h-24 md:w-36">
          <Image
            src={workout.image || "/assets/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="144px"
          />
        </div>

     
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold uppercase leading-tight text-white">
            {workout.name}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            {workout.equipment}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock3 className="h-4 w-4 text-[var(--color-brand)]" />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1.5 text-gray-300">
              <Flame className="h-4 w-4 text-[var(--color-brand)]" />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1.5 text-gray-300">
              <Star className="h-4 w-4 text-[var(--color-brand)]" />
              {workout.rating}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/workout/${workout.id}`}
            className="inline-flex h-9 items-center justify-center rounded-full border border-gray-500 px-4 text-xs font-medium text-gray-200 transition-colors hover:border-white hover:text-white"
          >
            View Details
          </Link>

          {showDoneButton && !savedView && (
            <button
              type="button"
              onClick={() => markAsDone(workout.id)}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[var(--color-brand)] px-4 text-xs font-semibold text-black transition-opacity hover:opacity-90"
            >
              <Check className="h-4 w-4" />
              Mark as Done
            </button>
          )}

        
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${workout.name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}