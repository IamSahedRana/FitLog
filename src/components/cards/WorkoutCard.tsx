import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types";

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl bg-[var(--color-card)] transition-all duration-300 hover:ring-2 hover:ring-[var(--color-brand)]"
    >
    
      <div className="relative h-48 w-full bg-gray-900">
        <Image
          src={workout.image || "/assets/banner.png"}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

    
      <div className="p-5">
      
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscleGroup) => (
            <span
              key={muscleGroup}
              className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black"
            >
              {muscleGroup}
            </span>
          ))}
        </div>

    
        <h3 className="mb-1 truncate font-display text-xl font-bold uppercase text-white">
          {workout.name}
        </h3>

        
        <p className="mb-5 truncate text-sm text-gray-400">
          {workout.equipment || "No equipment"}
        </p>


        <div className="flex items-center gap-4 text-xs font-medium text-gray-300">

          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[var(--color-brand)]" />
            <span>{workout.duration} min</span>
          </div>

     
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-[var(--color-brand)]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

      
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-[var(--color-brand)] text-[var(--color-brand)]" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}