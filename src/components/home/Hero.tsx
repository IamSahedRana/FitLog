import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content */}
        <div className="max-w-xl w-full">
          <p className="text-[var(--color-brand)] text-xs md:text-sm font-bold uppercase tracking-wider mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase leading-[1.05] mb-6">
            TRAIN WITH INTENT.<br/> LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <Link 
            href="#library" 
            className="inline-block bg-[var(--color-brand)] text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-[#b3e600] transition-colors"
          >
            Browse Workouts
          </Link>
        </div>
        
        {/* Right Side: Image */}
        <div className="relative w-full max-w-lg h-[350px] md:h-[450px]">
          <Image 
            src="/assets/banner.png" 
            alt="Muscular anatomy training"
            fill
            className="object-contain"
            priority
          />
        </div>
        
      </div>
    </section>
  );
}