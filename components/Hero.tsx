"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import { photos } from "@/data/photos";
import PhotoImage from "./Photo";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const words = site.name.split(" ");
  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <motion.div style={{ y: imgY }} className="relative z-0 w-[min(72vw,400px)]"
        initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: revealed ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }} transition={{ duration: 1.5, ease, delay: 0.1 }}>
        <motion.div className="aspect-[4/5] overflow-hidden bg-mist" initial={{ filter: "grayscale(1) brightness(1.7)" }}
          animate={{ filter: revealed ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(1.7)" }} transition={{ duration: 2.4, delay: 0.4 }}>
          <motion.div style={{ scale: imgScale }} className="h-full w-full">
            <PhotoImage photo={photos[0]} priority sizes="(min-width:768px) 400px, 72vw" w={1200} h={1500} />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.h1 style={{ y: nameY }} aria-label={site.name}
        className="pointer-events-none absolute inset-x-0 z-10 px-4 text-center font-display text-[clamp(4.5rem,19vw,18rem)] leading-[.84] tracking-tight text-white mix-blend-difference">
        {words.map((w, i) => (
          <span key={w} className="block overflow-hidden pb-[.06em]" aria-hidden>
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: revealed ? 0 : "110%" }} transition={{ duration: 1.2, ease, delay: 0.5 + i * 0.14 }}>{w}</motion.span>
          </span>
        ))}
      </motion.h1>
      <motion.p className="absolute bottom-8 left-6 max-w-[16rem] text-sm leading-relaxed text-ink/70 md:left-10" initial={{ opacity: 0 }} animate={{ opacity: revealed ? 1 : 0 }} transition={{ delay: 1.4, duration: 1 }}>
        {site.tagline}
      </motion.p>
      <motion.a href="#destaques" className="absolute bottom-8 right-6 flex items-center gap-3 text-sm md:right-10" initial={{ opacity: 0 }} animate={{ opacity: revealed ? 1 : 0 }} transition={{ delay: 1.6 }}>
        Role para explorar
        <span className="relative block h-12 w-px overflow-hidden bg-line"><span className="absolute inset-x-0 top-0 h-5 animate-[drop_1.8s_ease-in-out_infinite] bg-ink" /></span>
      </motion.a>
    </section>
  );
}
