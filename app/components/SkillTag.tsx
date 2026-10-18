"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * ป้ายสกิล: กดแล้วไอคอนเด้งขึ้นเล็กน้อย → เด้งลง → กลับที่เดิม
 * (ไอคอนต้องมี class "skill-icon")
 */
export default function SkillTag({ children }: { children: ReactNode }) {
  const [bounce, setBounce] = useState(false);

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => setBounce(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setBounce(true);
        }
      }}
      onAnimationEnd={() => setBounce(false)}
      className={`skill-tag group/tag inline-flex cursor-pointer select-none items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 text-sm text-[#F8FAFC]/90 outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#a78bfa] hover:bg-[#8B5CF6]/20 hover:text-white hover:shadow-[0_8px_22px_-8px_rgba(139,92,246,0.7)] focus-visible:border-[#a78bfa] ${
        bounce ? "is-bounce" : ""
      }`}
    >
      {children}
    </span>
  );
}