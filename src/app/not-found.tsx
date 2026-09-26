import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
      <h2 className="font-display text-6xl font-bold text-white">404</h2>
      <p className="text-gray-400 text-xl">Looks like this lift doesn&apos;t exist.</p>
      <Link href="/" className="bg-[var(--color-brand)] text-black px-8 py-3 rounded-md font-bold hover:bg-[#b3e600] transition-colors">
        Back to Library
      </Link>
    </div>
  );
}