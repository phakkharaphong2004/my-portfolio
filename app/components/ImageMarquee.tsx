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
  const [active, setActive] = useState<number | null>(null);
  const loop = [...items, ...items]; // ซ้ำ 2 ชุดเพื่อให้วนต่อเนื่องไม่มีช่องว่าง

  const hold = () => setPaused(true);
  const release = () => setPaused(false);
  const toggle = (idx: number) =>
    setActive((cur) => (cur === idx ? null : idx));

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
          {loop.map((item, i) => {
            const idx = i % items.length; // ชุดซ้ำใช้ index เดียวกับชุดจริง
            const isOpen = active === idx;
            return (
              <figure
                key={i}
                role="button"
                tabIndex={i < items.length ? 0 : -1}
                aria-pressed={isOpen}
                aria-hidden={i >= items.length}
                onClick={() => toggle(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(idx);
                  }
                }}
                className="group mr-8 w-72 shrink-0 cursor-pointer outline-none transition-transform duration-300 hover:-translate-y-3 sm:w-80"
              >
                <div
                  className={`overflow-hidden rounded-xl border bg-[#12141d] transition-colors duration-300 group-hover:border-[#8B5CF6]/60 group-focus-visible:border-[#8B5CF6] ${
                    isOpen ? "border-[#8B5CF6]/70" : "border-[#202530]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    width={640}
                    height={427}
                    draggable={false}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>

                {/* คำอธิบายใต้รูป: ขึ้นเมื่อคลิกรูปนั้น (จองที่ไว้ ไม่ให้เลย์เอาต์กระตุก) */}
                <figcaption
                  className={`mt-3 flex min-h-[2.75rem] items-start gap-2 px-1 text-sm leading-relaxed text-[#F8FAFC] transition-all duration-300 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1 opacity-0"
                  }`}
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#3B82F6]" />
                  <span>{item.caption}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[#F8FAFC]/40">
        คลิกที่รูปเพื่อดูคำอธิบาย · กดเมาส์ค้างเพื่อหยุดดูรูป
      </p>
    </div>
  );
}