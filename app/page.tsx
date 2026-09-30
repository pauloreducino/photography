"use client";
import { useCallback, useState } from "react";
import CameraIntro from "@/components/CameraIntro";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Highlights from "@/components/Highlights";
import Gallery from "@/components/Gallery";
import { About, Contact, Footer, Header } from "@/components/Sections";

export default function Page() {
  const [revealed, setRevealed] = useState(false);
  const onReveal = useCallback(() => setRevealed(true), []);
  const replay = () => { window.scrollTo(0, 0); location.reload(); };
  return (
    <>
      <CameraIntro onReveal={onReveal} />
      <Cursor />
      <Header />
      <main><Hero revealed={revealed} /><Marquee /><Highlights /><Gallery /><About /><Contact /></main>
      <Footer onReplay={replay} />
    </>
  );
}
