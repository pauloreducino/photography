"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Cursor com rótulo ("Ver") sobre elementos com data-cursor. Só em dispositivos com mouse.
export default function Cursor() {
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 34 }), sy = useSpring(y, { stiffness: 420, damping: 34 });
  const [label, setLabel] = useState<string | null>(null);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const mv = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(t?.dataset.cursor ?? null);
    };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, [x, y]);
  if (!fine) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[90]">
      <motion.div animate={{ scale: label ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="-ml-10 -mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-ink text-sm text-white">{label}</motion.div>
    </motion.div>
  );
}
