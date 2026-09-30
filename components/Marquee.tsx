import { categories } from "@/data/photos";

export default function Marquee() {
  const items = [...categories, ...categories, ...categories, ...categories];
  const row = items.map((c, i) => (
    <span key={i} className="flex items-center gap-10 pr-10 font-display text-6xl italic md:text-8xl">
      {c}<svg width="28" height="28" viewBox="0 0 28 28" className="text-accent" aria-hidden><circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="14" cy="14" r="5" fill="currentColor" /></svg>
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-line py-8" aria-hidden>
      <div className="marquee-track flex w-max whitespace-nowrap">{row}{row}</div>
    </div>
  );
}
