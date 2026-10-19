"use client";

import { useState } from "react";
import Image from "next/image";
import { T, useTr, type L } from "./LangProvider";

type Item = { src?: string; title?: L; caption: L; pending?: boolean };

export default function ImageMarquee({
  items,
  duration = 80,
  reverse = false,
}: {
  items: Item[];
  duration?: number; // วินาทีต่อ 1 รอบ (ยิ่งมากยิ่งช้า)
  reverse?: boolean; // true = วิ่งสวนทาง
}) {
  const [paused, setPaused] = useState(false);
  const tr = useTr();
  const loop = [...items, ...items];

  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div
        className="marquee-wrap cursor-grab touch-pan-y select-none overflow-hidden py-4 active:cursor-grabbing"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
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
            animationDirection: reverse ? "reverse" : "normal",
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
                {item.pending || !item.src ? (
                  <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#8B5CF6]/10 to-[#3B82F6]/5">
                    <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#8B5CF6]/25 border-t-[#a78bfa]" />
                    <span className="text-sm font-semibold text-[#F8FAFC]/70">
                      <T
                        v={{
                          th: "รออัปเดต",
                          en: "Coming soon",
                          zh: "即将更新",
                        }}
                      />
                    </span>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={tr(item.title ?? item.caption)}
                    width={640}
                    height={427}
                    draggable={false}
                    className="aspect-[3/2] w-full object-cover"
                  />
                )}
              </div>

              <figcaption className="mt-3 flex min-h-[4.5rem] -translate-y-1 items-start gap-2 px-1 text-sm leading-relaxed opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#3B82F6]" />
                <span>
                  {item.title && (
                    <strong className="block font-semibold text-[#F8FAFC]">
                      <T v={item.title} />
                    </strong>
                  )}
                  <span className="text-[#F8FAFC]/70">
                    <T v={item.caption} />
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[#F8FAFC]/40">
        <T
          v={{
            th: "เอาเมาส์ชี้ที่รูปเพื่อดูคำอธิบาย · กดเมาส์ค้างเพื่อหยุดดูรูป",
            en: "Hover an image to see its description · press and hold to pause",
            zh: "鼠标悬停图片查看说明 · 按住鼠标可暂停滚动",
          }}
        />
      </p>
    </div>
  );
}