// Sons sintetizados com Web Audio (sem arquivos). Navegadores só liberam áudio após um gesto do usuário.
let ctx: AudioContext | null = null;
let muted = false;
const get = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const A = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!A) return null;
    ctx = new A();
  }
  return ctx;
};
export const audioRunning = () => get()?.state === "running";
export const unlockAudio = () => { const c = get(); if (c && c.state === "suspended") c.resume().catch(() => {}); };
export const setMuted = (m: boolean) => { muted = m; };

function noise(c: AudioContext, t: number, dur: number, freq: number, q: number, gain: number) {
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  const s = c.createBufferSource(); s.buffer = buf;
  const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = freq; f.Q.value = q;
  const g = c.createGain(); g.gain.value = gain;
  s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
}
function tone(c: AudioContext, t: number, freq: number, end: number, dur: number, gain: number) {
  const o = c.createOscillator(); o.type = "sine";
  o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(end, t + dur);
  const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur);
}
// "Clac-clic" do espelho/obturador
export function playShutter() {
  const c = get(); if (!c || muted || c.state !== "running") return;
  const t = c.currentTime + 0.01;
  noise(c, t, 0.05, 3200, 1.2, 1.5); tone(c, t, 190, 70, 0.07, 0.8);
  noise(c, t + 0.08, 0.07, 1800, 0.9, 1.0); tone(c, t + 0.08, 130, 60, 0.09, 0.55);
}
// "Bip" de foco travado
export function playBeep() {
  const c = get(); if (!c || muted || c.state !== "running") return;
  tone(c, c.currentTime + 0.01, 2400, 2350, 0.09, 0.12);
}
