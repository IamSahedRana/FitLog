import { Workout } from "@/types";
import WorkoutCard from "../cards/WorkoutCard";

async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  
  return res.json();
}

export default async function WorkoutGrid() {
  const workouts = await fetchWorkouts();

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
   
      <div className="mb-10">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-2">
          The Library
        </h2>
        <p className="text-gray-400 text-lg">
          Twelve lifts covering every major muscle group.
        </p>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}