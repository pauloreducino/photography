"use client";
import { motion } from "framer-motion";

// Canon EOS R50 em SVG: corcunda central com EVF e flash retrátil, dial de modos, grip vermelho, lente RF-S 18-45mm.
export default function Camera({ flash, pressed, locked }: { flash: boolean; pressed: boolean; locked: boolean }) {
  return (
    <svg viewBox="0 0 320 210" className="w-[min(60vw,260px)] drop-shadow-[0_22px_34px_rgba(0,0,0,.6)]" role="img" aria-label="Câmera Canon EOS R50">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d4047" /><stop offset="1" stopColor="#202227" /></linearGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e4e6ea" /><stop offset=".5" stopColor="#8b9098" /><stop offset="1" stopColor="#d3d6db" /></linearGradient>
        <radialGradient id="glass" cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#6d86b3" /><stop offset=".4" stopColor="#1d2848" /><stop offset=".8" stopColor="#0a0c16" /><stop offset="1" stopColor="#3a1f4a" /></radialGradient>
      </defs>
      {/* flash retrátil */}
      <motion.g initial={false} animate={{ y: flash ? -16 : 4 }} transition={{ type: "spring", stiffness: 230, damping: 16 }}>
        <path d="M134 34 h52 l-3 -16 h-46 z" fill="#1a1b1f" stroke="#555962" />
        <rect x="142" y="21" width="36" height="8" rx="2" fill="#f1f3f7" />
        <rect x="150" y="30" width="3" height="10" fill="#6b6f78" /><rect x="167" y="30" width="3" height="10" fill="#6b6f78" />
      </motion.g>
      {/* corcunda do EVF */}
      <path d="M112 62 L122 38 Q124 32 131 32 H189 Q196 32 198 38 L208 62 Z" fill="url(#body)" stroke="#4d5058" />
      <rect x="150" y="46" width="20" height="10" rx="2" fill="#0d0e11" />
      {/* corpo */}
      <rect x="14" y="58" width="292" height="138" rx="22" fill="url(#body)" stroke="#50535b" />
      <path d="M14 96 H306" stroke="#15161a" strokeWidth="2" opacity=".5" />
      {/* grip */}
      <rect x="236" y="68" width="62" height="118" rx="16" fill="#191a1e" />
      <rect x="232" y="86" width="5" height="44" rx="2.5" fill="#c8102e" />
      {/* dial de modos, dial de controle e botão de disparo */}
      <rect x="40" y="46" width="44" height="14" rx="3" fill="url(#ring)" />
      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={45 + i * 4.6} x2={45 + i * 4.6} y1="47" y2="59" stroke="#4b4f57" strokeWidth="1" />)}
      <rect x="222" y="47" width="26" height="12" rx="3" fill="url(#ring)" />
      <motion.rect x="256" width="30" height="9" rx="3" fill="#cfd3da" stroke="#7d818a" initial={false} animate={{ y: pressed ? 53 : 49 }} transition={{ duration: 0.05 }} />
      <circle cx="262" cy="78" r="5" fill="#0c0d0f" />
      {/* marca e modelo */}
      <text x="30" y="92" fill="#e23b3b" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="20">Canon</text>
      <text x="196" y="92" fill="#aeb2ba" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="1.5">EOS R50</text>
      {/* lente RF-S 18-45mm */}
      <circle cx="132" cy="132" r="68" fill="url(#ring)" />
      <circle cx="132" cy="132" r="61" fill="#2a2c31" stroke="#0b0c0e" strokeWidth="2" />
      <circle cx="132" cy="132" r="56" fill="none" stroke="#45484f" strokeWidth="9" strokeDasharray="2 3" />
      <circle cx="132" cy="132" r="46" fill="#0b0c0e" stroke="#3c3f46" strokeWidth="2" />
      <motion.circle cx="132" cy="132" fill="url(#glass)" initial={false} animate={{ r: locked ? [36, 31, 36] : 36 }} transition={{ duration: 0.5 }} />
      <circle cx="132" cy="132" r="15" fill="#05060a" />
      <circle cx="132" cy="132" r="15" fill="none" stroke="#6d86b3" strokeOpacity=".35" />
      <ellipse cx="117" cy="115" rx="10" ry="5" fill="#fff" opacity=".4" transform="rotate(-38 117 115)" />
      <rect x="28" y="112" width="8" height="8" rx="4" fill="#0b0c0e" />
    </svg>
  );
}
