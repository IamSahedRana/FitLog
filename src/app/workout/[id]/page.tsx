import Image from "next/image";
import { notFound } from "next/navigation";
import { Workout } from "@/types";
import ActionButtons from "./ActionButtons";

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const workout: Workout = await res.json();

    return workout;
  } catch {
    return null;
  }
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-0 lg:py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ================= LEFT: IMAGE ================= */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gray-800 bg-[#111318]">
          <Image
            src={workout.image || "/assets/banner.png"}
            alt={workout.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* ================= RIGHT: CONTENT ================= */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="font-display text-[32px] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-[38px]">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-[590px] text-[15px] leading-[1.55] text-gray-400">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups?.map((muscle, index) => (
              <span
                key={index}
                className="rounded-full bg-[var(--color-brand)] px-4 py-1 text-[12px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* ================= STATS ================= */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-gray-800 bg-[#15181f]">
            {/* Equipment */}
            <div className="flex min-h-[49px] items-center justify-between border-b border-gray-800 px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Equipment
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.equipment}
              </span>
            </div>

            {/* Difficulty */}
            <div className="flex min-h-[49px] items-center justify-between border-b border-gray-800 px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Difficulty
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.difficulty}
              </span>
            </div>

            {/* Sets */}
            <div className="flex min-h-[49px] items-center justify-between border-b border-gray-800 px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Sets
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.sets}
              </span>
            </div>

            {/* Reps */}
            <div className="flex min-h-[49px] items-center justify-between border-b border-gray-800 px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Reps
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.reps}
              </span>
            </div>

            {/* Duration */}
            <div className="flex min-h-[49px] items-center justify-between border-b border-gray-800 px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Duration
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.duration} min
              </span>
            </div>

            {/* Calories */}
            <div className="flex min-h-[49px] items-center justify-between border-b border-gray-800 px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Calories
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            {/* Rating */}
            <div className="flex min-h-[49px] items-center justify-between px-6">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                Rating
              </span>

              <span className="text-[14px] text-gray-200">
                {workout.rating}
              </span>
            </div>
          </div>

          {/* ================= INSTRUCTIONS ================= */}
          <div className="mt-8">
            <h2 className="font-display text-[17px] font-bold uppercase text-white">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions?.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-[14px] leading-[1.45] text-gray-300"
                >
                  <span className="shrink-0 text-gray-400">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="mt-9">
            <ActionButtons workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}