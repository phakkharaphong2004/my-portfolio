"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

// เด้งขึ้นลงหลายจังหวะแบบลูกบอล ค่อยๆ เบาลงแล้วนิ่งที่เดิม (อยู่ภายในกล่องป้าย)
const BOUNCE: Keyframe[] = [
  { transform: "translateY(0) scaleY(1)", offset: 0 },
  { transform: "translateY(-8px) scaleY(1.12)", offset: 0.2 },
  { transform: "translateY(0) scaleY(0.82)", offset: 0.4 },
  { transform: "translateY(-5px) scaleY(1.06)", offset: 0.58 },
  { transform: "translateY(0) scaleY(0.9)", offset: 0.74 },
  { transform: "translateY(-2px) scaleY(1.02)", offset: 0.88 },
  { transform: "translateY(0) scaleY(1)", offset: 1 },
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
      duration: 800,
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
      className="group/tag inline-flex cursor-pointer overflow-hidden active:scale-95 select-none items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-2 text-sm text-[#F8FAFC]/90 outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#a78bfa] hover:bg-[#8B5CF6]/20 hover:text-white hover:shadow-[0_8px_22px_-8px_rgba(139,92,246,0.7)] focus-visible:border-[#a78bfa]"
    >
      {children}
    </span>
  );
}