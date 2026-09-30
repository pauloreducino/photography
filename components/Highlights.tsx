"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { photos } from "@/data/photos";
import PhotoImage from "./Photo";

const picks = [0, 6, 7, 1, 4, 9].map((i) => photos[i]);

// Seção "pinada": a rolagem vertical move a faixa de fotos na horizontal.
export default function Highlights() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="destaques" ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="absolute left-6 right-6 top-24 flex items-end justify-between md:left-10 md:right-10">
          <h2 className="font-display text-5xl md:text-7xl">Destaques</h2>
          <div className="mb-3 hidden h-px w-40 bg-line md:block"><motion.div className="h-px bg-ink" style={{ width: bar }} /></div>
        </div>
        <motion.div style={{ x }} className="flex items-center gap-6 pl-6 pr-[30vw] pt-24 md:gap-10 md:pl-10">
          {picks.map((p, i) => (
            <figure key={p.id} className={`shrink-0 ${i % 2 ? "w-[62vw] md:w-[28vw]" : "w-[70vw] md:w-[32vw]"} ${i % 2 ? "mt-16" : "-mt-8"}`}>
              <div className="aspect-[4/5] overflow-hidden bg-mist"><PhotoImage photo={p} sizes="(min-width:768px) 32vw, 70vw" w={900} h={1125} /></div>
              <figcaption className="mt-3 flex justify-between text-sm"><span>{p.title}</span><span className="text-ink/50">{p.category}</span></figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
