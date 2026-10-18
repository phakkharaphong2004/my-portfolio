"use client";

import { useState } from "react";
import Image from "next/image";

type Item = { src: string; caption: string };

export default function ImageMarquee({
  items,
  duration = 80,
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
        className="marquee-wrap cursor-grab touch-pan-y select-none overflow-hidden py-4 active:cursor-grabbing"
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
              aria-hidden={i >= items.length}
              className="group mr-8 w-72 shrink-0 transition-transform duration-300 hover:-translate-y-3 sm:w-80"
            >
              <div className="overflow-hidden rounded-xl border border-[#202530] bg-[#12141d] transition-colors duration-300 group-hover:border-[#8B5CF6]/60">
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={640}
                  height={427}
                  draggable={false}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>

              {/* คำอธิบายใต้รูป: ขึ้นเมื่อเมาส์ชี้รูปนั้น (จองที่ไว้ ไม่ให้เลย์เอาต์กระตุก) */}
              <figcaption className="mt-3 flex min-h-[2.75rem] -translate-y-1 items-start gap-2 px-1 text-sm leading-relaxed text-[#F8FAFC] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#3B82F6]" />
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[#F8FAFC]/40">
        เอาเมาส์ชี้ที่รูปเพื่อดูคำอธิบาย · กดเมาส์ค้างเพื่อหยุดดูรูป
      </p>
    </div>
  );
}