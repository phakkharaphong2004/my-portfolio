"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectMarquee({
  images,
  alt,
  duration = 30,
  reverse = false,
}: {
  images: string[];
  alt: string;
  duration?: number; // วินาทีต่อ 1 รอบ (ยิ่งมากยิ่งช้า)
  reverse?: boolean;
}) {
  const [paused, setPaused] = useState(false);

  // ไม่มีรูป → ช่อง "รออัปเดต" 3 ช่อง
  const slides: (string | null)[] =
    images.length > 0 ? images : [null, null, null];
  const loop = [...slides, ...slides];

  return (
    <div
      className="marquee-wrap relative h-full min-h-[260px] w-full overflow-hidden bg-[#12141d] py-4"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="marquee-track flex h-full w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loop.map((src, i) => (
          <div
            key={i}
            aria-hidden={i >= slides.length}
            className="relative mr-4 aspect-[3/2] w-56 shrink-0 overflow-hidden rounded-xl border border-[#202530] bg-[#12141d] transition-colors duration-300 hover:border-[#8B5CF6]/60 sm:w-64"
          >
            {src ? (
              <Image
                src={src}
                alt={`${alt} ${(i % slides.length) + 1}`}
                fill
                sizes="256px"
                draggable={false}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5">
                <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#8B5CF6]/25 border-t-[#a78bfa]" />
                <span className="text-xs text-[#F8FAFC]/60">รออัปเดตภาพ</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}