"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageSlider({
  images,
  alt,
  interval = 3500,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const slides: (string | null)[] =
    images.length > 0 ? images : [null, null, null];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [paused, slides.length, interval]);

  return (
    <div
      className="relative h-full min-h-[240px] w-full overflow-hidden bg-[#12141d]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div key={i} className="relative h-full min-h-[240px] w-full shrink-0">
            {src ? (
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5">
                <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#8B5CF6]/25 border-t-[#a78bfa]" />
                <span className="text-sm text-[#F8FAFC]/60">
                  รออัปเดตภาพ {i + 1}/{slides.length}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`รูปที่ ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-[#a78bfa]"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}