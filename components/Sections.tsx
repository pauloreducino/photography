"use client";
import { useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { site } from "@/data/site";
import { photos } from "@/data/photos";
import PhotoImage from "./Photo";
import Magnetic from "./Magnetic";

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setHidden(v > (scrollY.getPrevious() ?? 0) && v > 140));
  const link = "transition hover:text-accent";
  return (
    <motion.header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-white/80 backdrop-blur-md" animate={{ y: hidden ? "-100%" : 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      <div className="flex h-16 items-center justify-between px-6 md:px-10">
        <a href="#" className="font-display text-2xl">{site.name}</a>
        <nav className="flex gap-6 text-sm" aria-label="Principal">
          <a className={link} href="#portfolio">Portfólio</a><a className={link} href="#sobre">Sobre</a><a className={link} href="#contato">Contato</a>
        </nav>
      </div>
      <motion.div className="h-[2px] origin-left bg-accent" style={{ scaleX: bar }} />
    </motion.header>
  );
}

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.14, 1]);
  return <motion.span style={{ opacity: o }}>{w}</motion.span>;
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const { scrollYProgress: pp } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const y = useTransform(pp, [0, 1], ["-12%", "12%"]);
  const words = site.about.join(" ").split(" ");
  return (
    <section id="sobre" className="scroll-mt-20 bg-mist py-28">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-6 md:grid-cols-12 md:px-10">
        <div ref={photoRef} className="aspect-[4/5] overflow-hidden md:col-span-4">
          <motion.div style={{ y }} className="h-[124%] w-full -translate-y-[8%]"><PhotoImage photo={photos[5]} sizes="(min-width:768px) 30vw, 100vw" w={1000} h={1250} /></motion.div>
        </div>
        <div className="md:col-span-8 md:pl-10">
          <p ref={ref} className="flex flex-wrap gap-x-[.28em] font-display text-3xl leading-[1.15] md:text-5xl">
            {words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={p} />)}
          </p>
          <dl className="mt-14 divide-y divide-line border-y border-line">
            {site.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 py-4 text-sm"><dt className="text-ink/55">{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const wa = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;
  return (
    <section id="contato" className="mx-auto max-w-[1500px] scroll-mt-20 px-6 py-32 md:px-10">
      <h2 className="max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] leading-[.92]">Vamos fazer uma foto juntos?</h2>
      <div className="mt-14 flex flex-wrap items-center gap-6">
        <Magnetic><a href={wa} target="_blank" rel="noopener noreferrer" className="flex h-36 w-36 items-center justify-center rounded-full bg-ink text-center text-base text-white transition hover:bg-accent md:h-44 md:w-44">Chamar no WhatsApp</a></Magnetic>
        <Magnetic><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex h-36 w-36 items-center justify-center rounded-full border border-ink text-center text-base transition hover:bg-ink hover:text-white md:h-44 md:w-44">Instagram {site.instagram.handle}</a></Magnetic>
      </div>
      <p className="mt-10 text-sm text-ink/55">{site.whatsapp.display}</p>
    </section>
  );
}

export function Footer({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink/60 md:px-10">
        <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
        <button onClick={onReplay} className="underline underline-offset-4 hover:text-ink">Rever introdução</button>
      </div>
    </footer>
  );
}
