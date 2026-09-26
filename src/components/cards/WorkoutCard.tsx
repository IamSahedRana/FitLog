import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  // Defensive check: Ensure categories is ALWAYS an array, even if the API returns undefined or a string
  const getCategories = () => {
    if (!workout.category) return [];
    if (Array.isArray(workout.category)) return workout.category;
    if (typeof workout.category === 'string') return (workout.category as string).split(',').map(c => c.trim());
    return [];
  };

  const categories = getCategories();

  return (
    <Link 
      href={`/workout/${workout.id}`} 
      className="group block bg-[var(--color-card)] rounded-2xl overflow-hidden hover:ring-2 hover:ring-[var(--color-brand)] transition-all duration-300"
    >
      {/* Top Image */}
      <div className="relative h-48 w-full bg-gray-900">
        <Image
          src={workout.image || "/assets/banner.png"} // Added a fallback image just in case
          alt={workout.name || "Workout"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Bottom Content */}
      <div className="p-5">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-[var(--color-brand)] text-black text-[10px] font-bold uppercase rounded-full tracking-wider"
            >
              {cat}
            </span>
          ))}
        </div>
        
        {/* Title & Equipment */}
        <h3 className="font-display text-xl font-bold text-white uppercase mb-1 truncate">
          {workout.name}
        </h3>
        <p className="text-gray-400 text-sm mb-5 truncate">
          {workout.equipment || "No equipment"}
        </p>
        
        {/* Stats Row */}
        <div className="flex items-center gap-4 text-gray-300 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[var(--color-brand)]" />
            <span>{workout.duration || 0} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[var(--color-brand)]" />
            <span>{workout.calories || 0} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-[var(--color-brand)] fill-[var(--color-brand)]" />
            <span>{workout.rating || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}