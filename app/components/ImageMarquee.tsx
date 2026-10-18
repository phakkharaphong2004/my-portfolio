"use client";

import { useState } from "react";
import Image from "next/image";

type Item = { src: string; caption: string };

export default function ImageMarquee({
  items,
  duration = 40,
}: {
  items: Item[];
  duration?: number; // วินาทีต่อ 1 รอบ (ยิ่งมากยิ่งช้า)
}) {
  const [paused, setPaused] = useState(false);
  const loop = [...items, ...items]; // ซ้ำ 2 ชุดเพื่อให้วนต่อเนื่องไม่มีช่องว่าง

  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  return (
    <div>
      <div
        className="marquee-wrap touch-pan-y select-none overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
        onPointerDown={hold}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
      >
        <div
          className="marquee-track flex w-max"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {loop.map((item, i) => (
            <figure
              key={i}
              className="mr-5 w-64 shrink-0 sm:w-72"
              aria-hidden={i >= items.length}
            >
              <div className="overflow-hidden rounded-xl border border-[#202530] bg-[#12141d]">
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={576}
                  height={384}
                  draggable={false}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-center text-xs leading-relaxed text-[#F8FAFC]/60">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[#F8FAFC]/40">
        กดเมาส์ค้างเพื่อหยุดดูรูป
      </p>
    </div>
  );
}