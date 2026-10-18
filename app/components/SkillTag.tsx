"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

// เด้งขึ้น → เด้งลง → เด้งเบาๆ → กลับที่เดิม
const BOUNCE: Keyframe[] = [
  { transform: "translateY(0) scale(1)" },
  { transform: "translateY(-7px) scale(1.25)", offset: 0.35 },
  { transform: "translateY(0) scale(0.9)", offset: 0.65 },
  { transform: "translateY(-2px) scale(1.05)", offset: 0.85 },
  { transform: "translateY(0) scale(1)" },
];

/**
 * ป้ายสกิล: กดแล้วไอคอนเด้งขึ้นเล็กน้อย แล้วกลับที่เดิม
 * (ไอคอนข้างในต้องมี class "skill-icon")
 * ใช้ Web Animations API จึงไม่ต้องพึ่งโค้ดใน globals.css
 */
export default function SkillTag({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  const bounce = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const icon = ref.current?.querySelector<HTMLElement | SVGElement>(".skill-icon");
    icon?.animate(BOUNCE, {
      duration: 550,
      easing: "cubic-bezier(0.28, 0.84, 0.42, 1)",
    });
  };

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={bounce}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          bounce();
        }
      }}
      className="group/tag inline-flex cursor-pointer select-none items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 text-sm text-[#F8FAFC]/90 outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#a78bfa] hover:bg-[#8B5CF6]/20 hover:text-white hover:shadow-[0_8px_22px_-8px_rgba(139,92,246,0.7)] focus-visible:border-[#a78bfa]"
    >
      {children}
    </span>
  );
}