"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(139, 92, 246, 0.28)",
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  /** องศาเอียงสูงสุดตามเมาส์ (0 = ปิด) การ์ดเล็กใช้ 6-10 การ์ดใหญ่ใช้ 1-3 */
  tilt?: number;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    const el = divRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isFocused) setPosition({ x, y });

    if (tilt > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const px = x / rect.width - 0.5; // -0.5 ถึง 0.5
      const py = y / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * tilt).toFixed(2)}deg) rotateY(${(px * tilt).toFixed(2)}deg)`;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (divRef.current) divRef.current.style.transform = ""; // กลับมาตั้งตรง
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-[#202530] bg-[#12141d]/70 shadow-[0_0_24px_rgba(139,92,246,0.1)] backdrop-blur transition-all duration-300 hover:border-[#8B5CF6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};