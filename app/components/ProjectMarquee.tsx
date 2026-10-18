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
  reverse?: boolean; // true = วิ่งลง
}) {
  const [paused, setPaused] = useState(false);

  // ไม่มีรูป → ช่อง "รออัปเดต" 3 ช่อง
  const slides: (string | null)[] =
    images.length > 0 ? images : [null, null, null];
  const loop = [...slides, ...slides];

  return (
    <div
      className="relative h-[340px] w-full overflow-hidden bg-[#12141d] md:h-full md:min-h-[340px]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* absolute ทำให้ความสูงของแทร็กไม่ดันการ์ดให้ยืดตามจำนวนรูป */}
      <div
        className="marquee-track-y absolute inset-x-0 top-0 flex w-full flex-col items-center px-6"
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
            className="relative mb-4 aspect-[3/2] w-full max-w-sm shrink-0 overflow-hidden rounded-xl border border-[#202530] bg-[#12141d] transition-colors duration-300 hover:border-[#8B5CF6]/60"
          >
            {src ? (
              <Image
                src={src}
                alt={`${alt} ${(i % slides.length) + 1}`}
                fill
                sizes="384px"
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