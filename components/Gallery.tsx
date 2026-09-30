"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, photos, type Category } from "@/data/photos";
import PhotoImage from "./Photo";

type Filter = "Todas" | Category;
type L = typeof photos;

function Lightbox({ list, index, onIndex, onClose }: { list: L; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const p = list[index];
  const go = (d: number) => onIndex((index + d + list.length) % list.length);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  });
  const nav = "absolute top-1/2 -translate-y-1/2 rounded-full border border-line bg-white/80 px-4 py-3 text-sm backdrop-blur transition hover:bg-ink hover:text-white";
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.title} className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-white/95 p-4 pb-24 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full border border-line px-4 py-2 text-sm transition hover:bg-ink hover:text-white">Fechar</button>
      <button onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${nav} left-4`} aria-label="Foto anterior">Anterior</button>
      <button onClick={(e) => { e.stopPropagation(); go(1); }} className={`${nav} right-4`} aria-label="Próxima foto">Próxima</button>
      <motion.div layoutId={`photo-${p.id}`} onClick={(e) => e.stopPropagation()} className="max-h-[70vh] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,.45)]" style={{ aspectRatio: `${p.w}/${p.h}` }}>
        <PhotoImage photo={p} sizes="90vw" />
      </motion.div>
      <p className="text-sm text-ink/70"><span className="font-display text-xl text-ink">{p.title}</span> · {p.category} · {index + 1}/{list.length}</p>
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 overflow-x-auto px-4" onClick={(e) => e.stopPropagation()}>
        {list.map((t, i) => (
          <button key={t.id} onClick={() => onIndex(i)} aria-label={t.title} className={`h-14 w-14 shrink-0 overflow-hidden transition ${i === index ? "opacity-100 ring-2 ring-ink" : "opacity-40 hover:opacity-80"}`}>
            <PhotoImage photo={t} sizes="56px" w={120} h={120} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (filter === "Todas" ? photos : photos.filter((p) => p.category === filter)), [filter]);
  return (
    <section id="portfolio" className="mx-auto max-w-[1500px] scroll-mt-20 px-6 py-28 md:px-10">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-5xl md:text-7xl">Portfólio</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filtrar por categoria">
          {(["Todas", ...categories] as Filter[]).map((c) => (
            <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} className="relative pb-1 text-base">
              <span className={filter === c ? "text-ink" : "text-ink/45 transition hover:text-ink"}>{c}</span>
              {filter === c && <motion.span layoutId="filter-underline" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[270px] md:grid-cols-4 md:gap-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.button key={p.id} layout onClick={() => setOpen(i)} aria-label={`Ampliar: ${p.title}`} data-cursor="Ver"
              className={`group relative overflow-hidden text-left ${p.h > p.w ? "row-span-2" : "col-span-2"}`}
              initial={{ clipPath: "inset(100% 0 0 0)" }} whileInView={{ clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0, scale: 0.94 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.08 }}>
              <motion.div layoutId={`photo-${p.id}`} className="h-full w-full overflow-hidden">
                <div className="h-full w-full scale-[1.08] transition duration-[900ms] ease-out group-hover:scale-100 group-hover:brightness-90"><PhotoImage photo={p} sizes="(min-width:768px) 25vw, 50vw" /></div>
              </motion.div>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-4 font-display text-2xl text-white transition duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">{p.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{open !== null && list[open] && <Lightbox list={list} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
