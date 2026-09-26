export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <span className="loading loading-spinner loading-lg text-[var(--color-brand)]"></span>
      <p className="text-gray-400 font-medium">Loading workouts...</p>
    </div>
  );
}