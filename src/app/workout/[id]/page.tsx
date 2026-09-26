import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Workout } from "@/types";
import ActionButtons from "./ActionButtons";

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const workouts: Workout[] = await res.json();
    const found = workouts.find((w) => String(w.id) === String(id));
    return found || null;
  } catch {
    return null;
  }
}

export default async function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  const categories = Array.isArray(workout.category)
    ? workout.category
    : typeof workout.category === 'string'
    ? (workout.category as string).split(',').map((c: string) => c.trim())
    : [];

  // Generate fallback description lines if instructions aren't an array
  const instructions = workout.description 
    ? workout.description.split('. ').filter(Boolean)
    : [
        "Execute each movement with controlled form and proper posture.",
        "Maintain core engagement throughout the entire range of motion.",
        "Rest for 60-90 seconds between sets to maximize recovery."
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Link>

      {/* Split Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Big Image Card */}
        <div className="relative h-[450px] md:h-[550px] w-full bg-gray-900 rounded-3xl overflow-hidden border border-gray-800">
          <Image
            src={workout.image || "/assets/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Details & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white uppercase mb-3">
              {workout.name}
            </h1>

            {/* Description Subtitle */}
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {workout.description || "A dynamic compound movement designed to build strength and overall power."}
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3.5 py-1 bg-[var(--color-brand)] text-black text-xs font-bold uppercase rounded-full tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Stats Table / Box matching screenshot */}
            <div className="bg-[#111318] rounded-2xl border border-gray-800/80 divide-y divide-gray-800/60 mb-8 text-sm">
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>EQUIPMENT</span>
                <span className="text-white font-medium">{workout.equipment || "Barbell, Bench"}</span>
              </div>
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>DIFFICULTY</span>
                <span className="text-white font-medium">Intermediate</span>
              </div>
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>SETS</span>
                <span className="text-white font-medium">4</span>
              </div>
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>REPS</span>
                <span className="text-white font-medium">6-8</span>
              </div>
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>DURATION</span>
                <span className="text-white font-medium">{workout.duration} min</span>
              </div>
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>CALORIES</span>
                <span className="text-white font-medium">{workout.calories} kcal</span>
              </div>
              <div className="flex justify-between px-5 py-3.5 text-gray-400">
                <span>RATING</span>
                <span className="text-white font-medium">{workout.rating}</span>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="mb-8">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2.5 text-gray-400 text-sm">
                {instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-gray-500 font-mono">{idx + 1}.</span>
                    <span>{step.endsWith('.') ? step : `${step}.`}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <ActionButtons workout={workout} />
          
        </div>
      </div>
    </div>
  );
}