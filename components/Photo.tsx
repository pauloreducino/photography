"use client";
import Image from "next/image";
import { useState } from "react";
import { unsplashUrl, type Photo as P } from "@/data/photos";

export default function PhotoImage({ photo, sizes, priority, w, h }: { photo: P; sizes: string; priority?: boolean; w?: number; h?: number }) {
  const [failed, setFailed] = useState(false);
  const width = w ?? photo.w, height = h ?? photo.h;
  if (failed) return <div role="img" aria-label={photo.title} style={{ background: photo.color, aspectRatio: `${width}/${height}` }} className="h-full w-full" />;
  return (
    <Image src={unsplashUrl(photo.unsplash, width, height)} alt={photo.title} width={width} height={height}
      sizes={sizes} priority={priority} onError={() => setFailed(true)}
      className="h-full w-full object-cover" style={{ background: photo.color }} />
  );
}
