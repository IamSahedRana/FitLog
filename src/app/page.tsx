import Hero from "@/components/home/Hero";
import WorkoutGrid from "@/components/home/WorkoutGrid";

export default function Home() {
  return (
    <div className="pb-24 scroll-smooth">
      <Hero />
      <WorkoutGrid />
    </div>
  );
}