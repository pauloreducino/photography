"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Camera from "./Camera";
import { audioRunning, playBeep, playShutter, setMuted, unlockAudio } from "@/lib/shutter";

function FocusFrame({ visible, locked }: { visible: boolean; locked: boolean }) {
  const c = locked ? "#5be37d" : "#ffffff";
  const corner = "absolute h-6 w-6 border-0 transition-colors duration-150";
  return (
    <motion.div aria-hidden className="absolute left-1/2 top-[58%] h-36 w-36 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 1.7 }} animate={{ opacity: visible ? 1 : 0, scale: visible ? (locked ? 0.92 : 1) : 1.7 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} style={{ borderColor: c }} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} style={{ borderColor: c }} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} style={{ borderColor: c }} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} style={{ borderColor: c }} />
    </motion.div>
  );
}

export default function CameraIntro({ onReveal }: { onReveal: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0); // 0 entrada · 1 flash sobe · 2 foco travado · 3 disparo · 4 tela branca
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMutedState] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    document.body.style.overflow = "";
    setShow(false);
    onReveal();
  }, [onReveal]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const k = reduce ? 0.7 : 1; // com "reduzir movimento" a intro continua, só mais curta
    timers.current = [
      setTimeout(() => setStep(1), 1100 * k), setTimeout(() => setStep(2), 1900 * k),
      setTimeout(() => setStep(3), 2700 * k), setTimeout(() => setStep(4), 2850 * k), setTimeout(finish, 3500 * k),
    ];
    return () => { timers.current.forEach(clearTimeout); document.body.style.overflow = ""; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const ok = () => { unlockAudio(); setUnlocked(true); };
    unlockAudio();
    if (audioRunning()) setUnlocked(true);
    const ev = ["pointerdown", "keydown", "touchstart"] as const;
    ev.forEach((e) => window.addEventListener(e, ok, { once: true }));
    return () => ev.forEach((e) => window.removeEventListener(e, ok));
  }, []);
  useEffect(() => { if (step === 2) playBeep(); if (step === 3) playShutter(); }, [step]);
  const toggleSound = () => { if (!unlocked) { unlockAudio(); setUnlocked(true); return; } setMuted(!muted); setMutedState(!muted); };

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" role="dialog" aria-label="Introdução" className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: step >= 4 ? "#fff" : "#141518" }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          {step < 4 && (
            <>
              <div className="absolute inset-x-0 top-[6vh] flex justify-center">
                <motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                  <Camera flash={step >= 1} locked={step >= 2} pressed={step === 3} />
                </motion.div>
              </div>
              <FocusFrame visible={step >= 1} locked={step >= 2} />
              <button onClick={toggleSound} className="absolute bottom-6 left-6 rounded-full border border-white/25 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10">
                {!unlocked ? "Ativar som" : muted ? "Som desligado" : "Som ligado"}
              </button>
              <button onClick={finish} className="absolute bottom-6 right-6 rounded-full border border-white/25 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10">
                Pular introdução
              </button>
            </>
          )}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-white" initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ duration: step === 3 ? 0.06 : 0.2 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
